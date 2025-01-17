import { Input } from '$lib/input/Input.svelte.js';
import type { Node } from '$lib/Node.js';
import { Output } from '$lib/output/Output.svelte.js';
import { Vector } from '$lib/space/Vector.js';
import { DevNode } from './devNode.svelte.js';

export function getDevNodes() {
	const node1: Node = new DevNode('dev1', new Vector(6, 5), 'dev1', {});
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
