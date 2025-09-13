import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getRectFromPositions } from '$lib/selection/getRectFromPositions.js';
import { getSelectionBoxContext } from '$lib/selection/selectionBoxContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { SvelteSet } from 'svelte/reactivity';
import { getNodeRectsContext } from '../node/nodeRectsContext.js';
import type { PointerStrategy } from '../node/PointerStrategy.js';
import { getRectsTouch } from './getRectsTouch.js';
import { getSelectedNodeIdsContext } from './selectedNodeIdsContext.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	doubleClickTimeout?: number;
	isActive = false; // TODO use $state
	lastClickTime: number = 0;
	mouseContext = getMouseContext();
	nodeRectsContext = getNodeRectsContext();
	pointerId?: number;
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	selectionBoxContext = getSelectionBoxContext();

	constructor(
		public element: HTMLElement,
		public isTouchDevice: boolean,
		public pointerCondition?: (e: PointerEvent) => boolean,
	) {}

	onpointerup = (e: PointerEvent) => {
		if (this.pointerCondition && !this.pointerCondition(e)) return;

		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		if (this.pointerId !== undefined) {
			this.element.releasePointerCapture(this.pointerId);
			this.pointerId = undefined;
		}

		this.isActive = false;
	};

	onpointermove = (e: PointerEvent) => {
		if (this.pointerCondition && !this.pointerCondition(e)) return;
		if (!this.selectionBoxContext.startPosition) return;

		const mouseRelativePosition = getMouseRelativePosition(e, this.element);
		this.selectionBoxContext.endPosition = mouseRelativePosition;

		const { endPosition, startPosition } = this.selectionBoxContext;
		if (startPosition && endPosition) {
			const selectionRect = getRectFromPositions(startPosition, endPosition);

			const { selectedNodeIds } = this.selectedNodeIdsContext;
			selectedNodeIds.clear();

			Object.entries(this.nodeRectsContext.nodeRects).forEach(([id, nodeRect]) => {
				if (getRectsTouch(nodeRect, selectionRect)) {
					selectedNodeIds.add(id);
				}
			});
		}
	};

	handlePointerDown = (e: PointerEvent) => {
		this.element.setPointerCapture(e.pointerId);
		const mouseRelativePosition = getMouseRelativePosition(e, this.element);
		this.isActive = true;
		this.pointerId = e.pointerId;
		this.selectedNodeIdsContext.selectedNodeIds = new SvelteSet();
		this.selectionBoxContext.endPosition = mouseRelativePosition;
		this.selectionBoxContext.startPosition = mouseRelativePosition;
	};

	onpointerdown = (e: PointerEvent) => {
		if (this.element !== e.target) return;
		if (this.pointerCondition && !this.pointerCondition(e)) return;

		if (this.isTouchDevice) {
			const currentTime = Date.now();
			const DOUBLE_CLICK_THRESHOLD = 300; // ms
			if (currentTime - this.lastClickTime < DOUBLE_CLICK_THRESHOLD) {
				// Double tap detected
				this.handlePointerDown(e);
			} else {
				// Single tap, set up for potential double tap
				this.lastClickTime = currentTime;
			}
		} else {
			// Non-touch behavior
			this.handlePointerDown(e);
		}
	};

	cleanup? = () => {
		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		if (this.pointerId === undefined) return;
		this.element.releasePointerCapture(this.pointerId);
	};
}
