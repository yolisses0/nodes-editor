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

	onpointerup = (e: PointerEvent) => {
		const { rootElement } = this.rootElementContext;
		if (!rootElement) return;

		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		rootElement.releasePointerCapture(e.pointerId);
		this.pointerId = undefined;
	};

	onpointermove = (e: PointerEvent) => {
		const { rootElement: nodeList } = this.rootElementContext;
		if (!nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
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
		const { rootElement: nodeList } = this.rootElementContext;
		if (!nodeList) return;
		if (nodeList !== e.target) return;

		nodeList.setPointerCapture(e.pointerId);
		this.pointerId = e.pointerId;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
		this.selectionBoxContext.endPosition = mouseRelativePosition;
		this.selectionBoxContext.startPosition = mouseRelativePosition;

		this.selectedNodeIdsContext.selectedNodeIds = new SvelteSet();
	};

	cleanup? = () => {
		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		const { rootElement: nodeList } = this.rootElementContext;
		if (!nodeList) return;
		if (this.pointerId === undefined) return;
		nodeList.releasePointerCapture(this.pointerId);
	};
}
