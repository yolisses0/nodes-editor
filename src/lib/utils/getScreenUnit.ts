import type { Space } from '$lib/space/Space.js';
import { Vector } from '$lib/space/Vector.js';

export function getScreenUnit(space: Space) {
	return space.getScreenSize(Vector.one());
}
