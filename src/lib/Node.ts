import { Vector } from '$lib/space/Vector.js';
import { Input } from './input/Input.svelte.js';
import { Output } from './output/Output.svelte.js';

export interface Node {
	id: string;
	size: Vector;
	type: string;
	inputs: Input[];
	position: Vector;
	outputs: Output[];
	extras: Record<string, number>;
}
