import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getSelectionBoxContext } from '$lib/selection/selectionBoxContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { getNodeListContext } from './nodeListContext.js';
import type { PointerStrategy } from './PointerStrategy.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	pointerId?: number;
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	selectionBoxContext = getSelectionBoxContext();

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
