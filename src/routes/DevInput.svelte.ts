import type { Connector } from '$lib/connector/Connector.js';
import type { InputData } from '$lib/input/InputData.js';
import type { Node } from '$lib/Node.js';
import type { Output } from '$lib/output/Output.svelte.js';
import { Vector } from '$lib/space/Vector.js';

export class DevInput implements Connector {
	id: string;
	name: string;
	connectedOutput?: Output;
	connectedOutputId?: string;

	constructor(
		inputData: InputData,
		public node: Node,
		private offset: number
	) {
		const { id, name, connectedOutputId } = inputData;
		this.id = id;
		this.name = name;
		this.connectedOutputId = connectedOutputId;
	}

	get position() {
		const indexOffset = new Vector(0, this.offset);
		return this.node.position.add(indexOffset);
	}

	get jointPosition() {
		const centeringOffset = new Vector(0.25, 0.5);
		return this.position.add(centeringOffset);
	}

	getData(): InputData {
		return {
			id: this.id,
			name: this.name
		};
	}
}
