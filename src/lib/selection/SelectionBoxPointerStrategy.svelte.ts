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
	isActive = $state(false);
	lastClickTime = 0;
	mouseContext = getMouseContext();
	nodeRectsContext = getNodeRectsContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	selectionBoxContext = getSelectionBoxContext();

	constructor(
		public element: HTMLElement,
		public isTouchDevice: boolean,
		public pointerCondition?: (e: PointerEvent) => boolean,
	) {}

	onpointerup = (e: PointerEvent) => {
		if (this.pointerCondition && !this.pointerCondition(e)) return;
		this.element.releasePointerCapture(e.pointerId);
		this.isActive = false;
		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;
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
		const mouseRelativePosition = getMouseRelativePosition(e, this.element);
		this.element.setPointerCapture(e.pointerId);
		e.stopPropagation();
		this.isActive = true;
		this.selectedNodeIdsContext.selectedNodeIds = new SvelteSet();
		this.selectionBoxContext.endPosition = mouseRelativePosition;
		this.selectionBoxContext.startPosition = mouseRelativePosition;
	};

	onpointerdown = (e: PointerEvent) => {
		e.stopImmediatePropagation();
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
	};
}
