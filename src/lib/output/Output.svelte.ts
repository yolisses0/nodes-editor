import { Vector } from '$lib/space/Vector.js';
import type { Connector } from '../connector/Connector.js';
import type { Input } from '../input/Input.svelte.js';
import type { Node } from '../Node.svelte.js';
import type { OutputData } from './OutputData.js';

export class Output implements Connector {
	id: string;
	name: string;
	connectedInputs: Input[] = [];

	constructor(
		outputData: OutputData,
		public node: Node,
		private offset: number
	) {
		const { id, name } = outputData;
		this.id = id;
		this.name = name;
	}

	get position() {
		const indexOffset = new Vector(0, this.offset);
		const widthOffset = new Vector(this.node.size.x - 1, 0);
		return this.node.position.add(indexOffset).add(widthOffset);
	}

	get jointPosition() {
		const centeringOffset = new Vector(0.75, 0.5);
		return this.position.add(centeringOffset);
	}

	getData(): OutputData {
		return {
			id: this.id,
			name: this.name
		};
	}
}
