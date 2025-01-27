import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getSelectionContext } from '$lib/selection/selectionContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { getNodeListContext } from './nodeListContext.js';
import type { PointerStrategy } from './PointerStrategy.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	pointerId?: number;
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	selectionContext = getSelectionContext();

	onpointerup = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		this.selectionContext.endPosition = undefined;
		this.selectionContext.startPosition = undefined;

		nodeList.releasePointerCapture(e.pointerId);
		this.pointerId = undefined;
	};

	onpointermove = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
		this.selectionContext.endPosition = mouseRelativePosition;
	};

	onpointerdown = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		nodeList.setPointerCapture(e.pointerId);
		this.pointerId = e.pointerId;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
		this.selectionContext.endPosition = mouseRelativePosition;
		this.selectionContext.startPosition = mouseRelativePosition;
	};

	cleanup? = () => {
		this.selectionContext.endPosition = undefined;
		this.selectionContext.startPosition = undefined;

		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;
		if (this.pointerId === undefined) return;
		nodeList.releasePointerCapture(this.pointerId);
	};
}
