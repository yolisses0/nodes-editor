import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getRectFromPositions } from '$lib/selection/getRectFromPositions.js';
import { getSelectionBoxContext } from '$lib/selection/selectionBoxContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { getRectsTouch } from './getRectsTouch.js';
import { getNodeListContext } from './nodeListContext.js';
import { getNodeRectsContext } from './nodeRectsContext.js';
import type { PointerStrategy } from './PointerStrategy.js';
import { getSelectedNodesContext } from './selectedNodesContext.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	pointerId?: number;
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	nodeRectsContext = getNodeRectsContext();
	selectionBoxContext = getSelectionBoxContext();
	selectedNodesContext = getSelectedNodesContext();

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
			this.selectedNodesContext.selectedNodes = Object.fromEntries(
				Object.entries(this.nodeRectsContext.nodeRects).map(([id, nodeRect]) => {
					return [id, getRectsTouch(nodeRect, selectionRect)];
				}),
			);
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
