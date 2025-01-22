import type { Vector } from '$lib/space/Vector.js';

export type MoveEvent = {
	mouseRelativePosition: Vector;
	initialMouseRelativePosition: Vector;
};
