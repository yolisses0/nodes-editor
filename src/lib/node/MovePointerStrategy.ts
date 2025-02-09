import type { Vector } from '$lib/space/Vector.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import type { MoveEvent } from './events/MoveEvent.js';
import { getNodeListContext } from './nodeListContext.js';
import type { PointerStrategy } from './PointerStrategy.js';

export class MoverPointerStrategy implements PointerStrategy {
	moved = false;
	isMoving = false;
	initialMouseRelativePosition!: Vector;
	nodeListContext = getNodeListContext();

	constructor(
		public element: Element,
		public callbacks: {
			onMove?: (e: MoveEvent) => void;
			onEndMove?: (e: MoveEvent) => void;
			onStartMove?: (e: MoveEvent) => void;
			onContextMenu?: (e: MouseEvent) => void;
		} = {},
	) {}

	onpointerdown = (e: PointerEvent) => {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!this.nodeListContext.nodeList) return;

		this.element.setPointerCapture(e.pointerId);
		e.stopPropagation();

		this.moved = false;
		this.isMoving = true;

		const mouseRelativePosition = getMouseRelativePosition(e, this.nodeListContext.nodeList);
		this.initialMouseRelativePosition = mouseRelativePosition;

		const { initialMouseRelativePosition } = this;
		this.callbacks.onStartMove?.({
			mouseRelativePosition,
			initialMouseRelativePosition,
		});
	};

	onpointermove = (e: PointerEvent) => {
		if (!this.isMoving) return;
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!this.nodeListContext.nodeList) return;

		this.moved = true;
		const mouseRelativePosition = getMouseRelativePosition(e, this.nodeListContext.nodeList);

		const { initialMouseRelativePosition } = this;
		this.callbacks.onMove?.({
			mouseRelativePosition,
			initialMouseRelativePosition,
		});
	};

	onpointerup = (e: PointerEvent) => {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!this.nodeListContext.nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, this.nodeListContext.nodeList);

		if (this.moved) {
			e.stopPropagation();
		}

		this.moved = false;
		this.isMoving = false;
		this.element.releasePointerCapture(e.pointerId);

		const { initialMouseRelativePosition } = this;
		this.callbacks.onEndMove?.({
			mouseRelativePosition,
			initialMouseRelativePosition,
		});
	};
}
