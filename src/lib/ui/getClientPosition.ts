import { Vector } from '$lib/space/Vector.js';

export function getClientPosition(e: MouseEvent) {
	return new Vector(e.clientX, e.clientY);
}
