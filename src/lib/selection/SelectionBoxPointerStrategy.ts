import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getRectFromPositions } from '$lib/selection/getRectFromPositions.js';
import { getSelectionBoxContext } from '$lib/selection/selectionBoxContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { SvelteSet } from 'svelte/reactivity';
import { getNodeRectsContext } from '../node/nodeRectsContext.js';
import type { PointerStrategy } from '../node/PointerStrategy.js';
import { getRootElementContext } from '../node/rootElementContext.js';
import { getRectsTouch } from './getRectsTouch.js';
import { getSelectedNodeIdsContext } from './selectedNodeIdsContext.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	pointerId?: number;
	mouseContext = getMouseContext();
	nodeRectsContext = getNodeRectsContext();
	rootElementContext = getRootElementContext();
	selectionBoxContext = getSelectionBoxContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();
	constructor(public pointerCondition?: (e: PointerEvent) => boolean) {}

	onpointerup = (e: PointerEvent) => {
		const { rootElement } = this.rootElementContext;
		if (!rootElement) return;
		if (this.pointerCondition && !this.pointerCondition(e)) return;

		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		rootElement.releasePointerCapture(e.pointerId);
		this.pointerId = undefined;
	};

	onpointermove = (e: PointerEvent) => {
		const { rootElement } = this.rootElementContext;
		if (!rootElement) return;
		if (this.pointerCondition && !this.pointerCondition(e)) return;

		const mouseRelativePosition = getMouseRelativePosition(e, rootElement);
		// TODO change only if selecting (when startPosition is defined)
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

	onpointerdown = (e: PointerEvent) => {
		const { rootElement } = this.rootElementContext;
		if (!rootElement) return;
		if (rootElement !== e.target) return;
		if (this.pointerCondition && !this.pointerCondition(e)) return;

		rootElement.setPointerCapture(e.pointerId);
		this.pointerId = e.pointerId;

		const mouseRelativePosition = getMouseRelativePosition(e, rootElement);
		this.selectionBoxContext.endPosition = mouseRelativePosition;
		this.selectionBoxContext.startPosition = mouseRelativePosition;

		this.selectedNodeIdsContext.selectedNodeIds = new SvelteSet();
	};

	cleanup? = () => {
		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		const { rootElement } = this.rootElementContext;
		if (!rootElement) return;
		if (this.pointerId === undefined) return;
		rootElement.releasePointerCapture(this.pointerId);
	};
}
