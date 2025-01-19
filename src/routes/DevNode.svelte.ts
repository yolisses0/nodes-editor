import type { Connector } from '$lib/connector/Connector.js';
import type { Node } from '$lib/node/Node.js';
import { Vector } from '$lib/space/Vector.js';

export class DevNode implements Node {
	position = $state(new Vector(0, 0));
	constructor(
		public id: string,
		position: Vector,
		public connectors: Connector[],
	) {
		this.position = position;
	}
}
