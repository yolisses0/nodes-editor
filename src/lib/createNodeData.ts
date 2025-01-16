import { Vector } from '$lib/space/Vector.js';
import { createId } from '$lib/utils/createId.js';
import { defaultNodeSize } from './defaultNodeSize.js';
import type { NodeData } from './NodeData.js';

export function createNodeData(position: Vector): NodeData {
	return {
		outputs: [],
		id: createId(),
		position: position.subtract(defaultNodeSize.divide(Vector.fromNumber(2))),
		inputs: [
			{ id: createId(), name: 'input1' },
			{ id: createId(), name: 'input2' },
			{ id: createId(), name: 'input3' }
		]
	};
}
