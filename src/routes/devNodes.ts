import { Vector } from '$lib/Vector.js';
import type { Node } from '../lib/Node.js';

const zoom = 20;

export const devNodes: Node[] = [
	{ id: 'devNode1', position: new Vector(0 * zoom, 0 * zoom) },
	{ id: 'devNode2', position: new Vector(3 * zoom, 4 * zoom) },
	{ id: 'devNode3', position: new Vector(5 * zoom, 6 * zoom) },
];
