import type { Vector } from '$lib/space/Vector.js';
import type { Node } from '../Node.js';

export type MoveNodeEvent = {
	node: Node;
	initialNodePosition: Vector;
	mouseRelativePosition: Vector;
	initialMouseRelativePosition: Vector;
};
