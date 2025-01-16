import type { Vector } from '$lib/space/Vector.js';

export function getVectorStringPx(vector: Vector) {
	return vector.x + 'px ' + vector.y + 'px';
}
