import type { Vector } from '$lib/space/Vector.js';
import { getVectorString } from './getVectorString.js';

export function getVectorsString(vectors: Vector[]) {
	return vectors.map((vector) => getVectorString(vector)).join(' ');
}
