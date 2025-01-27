export interface PointerStrategy {
	cleanup?: () => void;
	onpointerup?: (e: PointerEvent) => void;
	oncontextmenu?: (e: MouseEvent) => void;
	onpointermove?: (e: PointerEvent) => void;
	onpointerdown?: (e: PointerEvent) => void;
	onpointerleave?: (e: PointerEvent) => void;
}
