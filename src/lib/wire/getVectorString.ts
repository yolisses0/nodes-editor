import type { Vector } from '$lib/space/Vector.js';

export function getVectorString(vector: Vector) {
	return vector.x + ' ' + vector.y;
}
