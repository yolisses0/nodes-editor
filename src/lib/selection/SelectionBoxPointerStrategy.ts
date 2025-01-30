import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getRectFromPositions } from '$lib/selection/getRectFromPositions.js';
import { getSelectionBoxContext } from '$lib/selection/selectionBoxContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { SvelteSet } from 'svelte/reactivity';
import { getNodeListContext } from '../node/nodeListContext.js';
import { getNodeRectsContext } from '../node/nodeRectsContext.js';
import type { PointerStrategy } from '../node/PointerStrategy.js';
import { getRectsTouch } from './getRectsTouch.js';
import { getSelectedNodeIdsContext } from './selectedNodeIdsContext.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	pointerId?: number;
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	nodeRectsContext = getNodeRectsContext();
	selectionBoxContext = getSelectionBoxContext();
	selectedNodeIdsContext = getSelectedNodeIdsContext();

	onpointerup = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		this.selectionBoxContext.endPosition = undefined;
		this.selectionBoxContext.startPosition = undefined;

		nodeList.releasePointerCapture(e.pointerId);
		this.pointerId = undefined;
	};

	onpointermove = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
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
		const { nodeList } = this.nodeListContext;
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

		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;
		if (this.pointerId === undefined) return;
		nodeList.releasePointerCapture(this.pointerId);
	};
}
