import { Input } from '$lib/input/Input.svelte.js';
import { Node } from '$lib/Node.svelte.js';
import { Output } from '$lib/output/Output.svelte.js';
import { Vector } from '$lib/space/Vector.js';

export function getDevNodes() {
	const node1 = new Node({
		id: 'dev1',
		extras: {},
		inputs: [],
		outputs: [],
		position: Vector.one(),
		type: 'dev1'
	});

	const input1 = new Input(
		{
			id: 'devInput1',
			name: 'devInput1',
			connectedOutputId: 'devOutput1'
		},
		node1,
		1
	);
	const input2 = new Input(
		{
			id: 'devInput2',
			name: 'devInput2'
		},
		node1,
		2
	);

	node1.inputs.push(input1);
	node1.inputs.push(input2);

	const output1 = new Output(
		{
			id: 'devOutput1',
			name: 'devOutput1'
		},
		node1,
		3
	);

	node1.outputs.push(output1);

	const nodes: Node[] = [node1];

	return nodes;
}
