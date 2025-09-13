export interface PointerStrategy {
	cleanup?: () => void;
	oncontextmenu?: (e: MouseEvent) => void;
	onmousedown?: (e: MouseEvent) => void;
	onmouseenter?: (e: MouseEvent) => void;
	onmouseleave?: (e: MouseEvent) => void;
	onmousemove?: (e: MouseEvent) => void;
	onmouseup?: (e: MouseEvent) => void;
	onpointerdown?: (e: PointerEvent) => void;
	onpointerenter?: (e: PointerEvent) => void;
	onpointerleave?: (e: PointerEvent) => void;
	onpointermove?: (e: PointerEvent) => void;
	onpointerup?: (e: PointerEvent) => void;
}
