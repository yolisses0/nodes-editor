import type { Vector } from '$lib/space/Vector.js';
import { getVectorString } from './getVectorString.js';

// TODO adjust these hard coded values
export function getLinePathD(start: Vector, end: Vector) {
	return 'M' + getVectorString(start) + 'L' + getVectorString(end);
}
