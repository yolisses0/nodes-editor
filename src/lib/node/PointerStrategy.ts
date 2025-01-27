export interface PointerStrategy {
	onpointerup?(e: PointerEvent): void;
	oncontextmenu?(e: MouseEvent): void;
	onpointerleave?(e: MouseEvent): void;
	onpointermove?(e: PointerEvent): void;
	onpointerdown?(e: PointerEvent): void;
}
