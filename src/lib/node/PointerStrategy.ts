export interface PointerStrategy {
	handlePointerUp(e: PointerEvent): void;
	handleContextMenu(e: MouseEvent): void;
	handlePointerLeave(e: MouseEvent): void;
	handlePointerMove(e: PointerEvent): void;
	handlePointerDown(e: PointerEvent): void;
}
