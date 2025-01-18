import type { Vector } from '$lib/Vector.js';

export function getVectorString(vector: Vector) {
	return vector.x + ' ' + vector.y;
}
