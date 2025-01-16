import type { Space } from '$lib/space/Space';
import { Vector } from '$lib/space/Vector';

export function getScreenFontSize(space: Space) {
	return space.getScreenSize(Vector.fromNumber(3 / 4)).y;
}
