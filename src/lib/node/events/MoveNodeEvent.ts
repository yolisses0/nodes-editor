import type { Vector } from '$lib/space/Vector.js';
import type { Node } from '../Node.js';

export type MoveNodeEvent = {
	node: Node;
	position: Vector;
	mousePosition: Vector;
	initialPosition: Vector;
	initialNodePosition: Vector;
	initialMousePosition: Vector;
};
