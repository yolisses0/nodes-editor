import { Vector } from '$lib/space/Vector.js';

export function getPointerPosition(e: MouseEvent) {
	return new Vector(e.clientX, e.clientY);
}
