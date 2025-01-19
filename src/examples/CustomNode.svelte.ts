import { Vector, type Connector, type Node } from '$lib/index.js';

export class CustomNode implements Node {
	position = $state(new Vector(0, 0));
	constructor(
		public id: string,
		position: Vector,
		public connectors: Connector[],
	) {
		this.position = position;
	}
}
