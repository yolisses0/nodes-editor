import { Vector } from '$lib/space/Vector.js';
import type { Input } from './input/Input.js';
import type { Output } from './output/Output.svelte.js';

export interface Node {
	id: string;
	size: Vector;
	type: string;
	inputs: Input[];
	position: Vector;
	outputs: Output[];
	extras: Record<string, number>;
}
