import { Vector } from '$lib/index.js';
import type { Input } from '$lib/input/Input.js';
import type { NodeData } from '$lib/NodeData.js';
import type { Output } from '$lib/output/Output.svelte.js';
import { DevInput } from './DevInput.svelte.js';
import { DevOutput } from './DevOutput.svelte.js';

export class DevNode {
	id: string;
	size: Vector;
	type: string;
	inputs: Input[] = [];
	outputs: Output[] = [];
	position: Vector = $state()!;
	extras: Record<string, number>;

	constructor(nodeData: NodeData) {
		const { inputs, id, type, extras, outputs, position } = nodeData;
		this.id = id;
		this.type = type;
		this.extras = extras;
		this.position = Vector.fromData(position);

		let offset = 0;

		const headerOffset = 1;
		offset += headerOffset;

		this.outputs = outputs.map((outerData) => {
			const output = new DevOutput(outerData, this, offset);
			offset++;
			return output;
		});
		this.inputs = inputs.map((inputData) => {
			const input = new DevInput(inputData, this, offset);
			offset++;
			return input;
		});

		const width = 6;
		this.size = new Vector(width, offset);
	}
}
