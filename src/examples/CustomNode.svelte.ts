import { Vector, type Node } from '$lib/index.js';
import type { CustomConnector } from './CustomConnector.js';

export class CustomNode implements Node {
	position = $state(new Vector(0, 0));
	constructor(
		public id: string,
		position: Vector,
		public connectors: CustomConnector[],
	) {
		this.position = position;
	}
}
