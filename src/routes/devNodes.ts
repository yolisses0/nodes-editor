import { Vector } from '$lib/space/Vector.js';
import { CustomNode } from './CustomNode.svelte.js';
import { ZOOM } from './ZOOM.js';

export const devNodes: CustomNode[] = [
	new CustomNode('devNode1', new Vector(0 * ZOOM, 0 * ZOOM), [
		{ id: 'connector1.1' },
		{ id: 'connector1.2' },
		{ id: 'connector1.3' },
	]),
	new CustomNode('devNode2', new Vector(3 * ZOOM, 4 * ZOOM), [{ id: 'connector2.1' }]),
	new CustomNode('devNode3', new Vector(15 * ZOOM, 3 * ZOOM), [
		{ id: 'connector3.1' },
		{ id: 'connector3.2' },
	]),
];
