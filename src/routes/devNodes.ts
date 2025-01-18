import { Vector } from '$lib/Vector.js';
import type { Node } from '../lib/Node.js';

const zoom = 20;

export const devNodes: Node[] = [
	{
		id: 'devNode1',
		position: new Vector(0 * zoom, 0 * zoom),
		connectors: [{ id: 'connector1.1' }, { id: 'connector1.2' }, { id: 'connector1.3' }],
	},
	{
		id: 'devNode2',
		position: new Vector(3 * zoom, 4 * zoom),
		connectors: [{ id: 'connector2.1' }],
	},
	{
		id: 'devNode3',
		position: new Vector(15 * zoom, 3 * zoom),
		connectors: [{ id: 'connector3.1' }, { id: 'connector3.2' }],
	},
];
