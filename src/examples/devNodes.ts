import { Vector } from '$lib/index.js';
import { CustomConnector } from './CustomConnector.js';
import { CustomNode } from './CustomNode.svelte.js';
import { ZOOM } from './ZOOM.js';

export const devNodes: CustomNode[] = [
	new CustomNode('devNode1', new Vector(0 * ZOOM, 0 * ZOOM), [
		new CustomConnector('connector1.1'),
		new CustomConnector('connector1.2'),
		new CustomConnector('connector1.3'),
	]),
	new CustomNode('devNode2', new Vector(3 * ZOOM, 4 * ZOOM), [{ id: 'connector2.1' }]),
	new CustomNode('devNode3', new Vector(15 * ZOOM, 3 * ZOOM), [
		new CustomConnector('connector3.1'),
		new CustomConnector('connector3.2'),
	]),
];
