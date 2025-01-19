import type { Node } from '$lib/node/Node.js';
import { Vector } from '$lib/space/Vector.js';
import { ZOOM } from './ZOOM.js';

export const devNodes: Node[] = [
	{
		id: 'devNode1',
		position: new Vector(0 * ZOOM, 0 * ZOOM),
		connectors: [{ id: 'connector1.1' }, { id: 'connector1.2' }, { id: 'connector1.3' }],
	},
	{
		id: 'devNode2',
		position: new Vector(3 * ZOOM, 4 * ZOOM),
		connectors: [{ id: 'connector2.1' }],
	},
	{
		id: 'devNode3',
		position: new Vector(15 * ZOOM, 3 * ZOOM),
		connectors: [{ id: 'connector3.1' }, { id: 'connector3.2' }],
	},
];
