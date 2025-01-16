import type { VectorData } from '$lib/space/VectorData.js';
import type { InputData } from './input/InputData.js';
import type { OutputData } from './output/OutputData.js';

export type NodeData = {
	id: string;
	type: string;
	inputs: InputData[];
	position: VectorData;
	outputs: OutputData[];
	extras: Record<string, number>;
};
