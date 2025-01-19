import type { Vector } from '$lib/space/Vector.js';
import type { Node } from './Node.js';

export type OnMoveCallbackParams = {
	node: Node;
	position: Vector;
	initialNodeOffset: Vector;
	initialNodePosition: Vector;
	initialMousePosition: Vector;
};
