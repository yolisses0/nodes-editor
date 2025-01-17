import type { Node } from '$lib/Node.js';
import { Vector } from '$lib/space/Vector.js';
import { DevInput } from './DevInput.svelte.js';
import { DevNode } from './DevNode.svelte.js';
import { DevOutput } from './DevOutput.svelte.js';

export function getDevNodes() {
	const node1: Node = new DevNode('dev1', new Vector(6, 5), 'dev1', {});
	const input1 = new DevInput(
		{
			id: 'devInput1',
			name: 'devInput1',
			connectedOutputId: 'devOutput1'
		},
		node1,
		1
	);
	const input2 = new DevInput(
		{
			id: 'devInput2',
			name: 'devInput2'
		},
		node1,
		2
	);

	node1.inputs.push(input1);
	node1.inputs.push(input2);

	const output1 = new DevOutput(
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
