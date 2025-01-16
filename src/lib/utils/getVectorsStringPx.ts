import type { Vector } from '$lib/space/Vector.js';
import { getVectorStringPx } from './getVectorStringPx.js';

export function getVectorsStringPx(vectors: Vector[]) {
	return vectors.map((vector) => getVectorStringPx(vector)).join(' ');
}
