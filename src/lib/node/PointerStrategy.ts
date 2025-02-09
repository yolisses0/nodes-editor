export interface PointerStrategy {
	cleanup?: () => void;
	onpointerup?: (e: PointerEvent) => void;
	oncontextmenu?: (e: MouseEvent) => void;
	onpointermove?: (e: PointerEvent) => void;
	onpointerdown?: (e: PointerEvent) => void;
	onpointerleave?: (e: PointerEvent) => void;
	onmousedown?: (e: MouseEvent) => void;
	onmouseenter?: (e: MouseEvent) => void;
	onmouseleave?: (e: MouseEvent) => void;
}
