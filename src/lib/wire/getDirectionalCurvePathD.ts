import { Vector } from '$lib/space/Vector.js';
import { clamp } from './clamp.js';
import { getVectorsString } from './getVectorsString.js';
import { getVectorString } from './getVectorString.js';

// TODO consider removing this
export function getDirectionalCurvePathD(start: Vector, end: Vector) {
	let offsetX = (end.x - start.x) / 2;
	if (offsetX < 0) {
		offsetX *= 5;
	}
	offsetX = clamp(offsetX, -5, 5);
	offsetX = Math.abs(offsetX);
	offsetX = Math.min(offsetX, 10);

	const point0 = new Vector(start.x + offsetX, start.y);
	const point1 = new Vector(end.x - offsetX, end.y);

	return 'M' + getVectorString(start) + 'C' + getVectorsString([point0, point1, end]);
}
