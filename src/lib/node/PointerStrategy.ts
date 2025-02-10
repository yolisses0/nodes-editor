export interface PointerStrategy {
	cleanup?: () => void;
	onpointerup?: (e: PointerEvent) => void;
	onpointerdown?: (e: PointerEvent) => void;
	onpointermove?: (e: PointerEvent) => void;
	onpointerenter?: (e: PointerEvent) => void;
	onpointerleave?: (e: PointerEvent) => void;
	onmouseup?: (e: MouseEvent) => void;
	onmousedown?: (e: MouseEvent) => void;
	onmousemove?: (e: MouseEvent) => void;
	onmouseenter?: (e: MouseEvent) => void;
	onmouseleave?: (e: MouseEvent) => void;
	oncontextmenu?: (e: MouseEvent) => void;
}
