import { Vector } from '$lib/space/Vector.js';

export function getEventClientPosition(e: MouseEvent) {
	return new Vector(e.clientX, e.clientY);
}
