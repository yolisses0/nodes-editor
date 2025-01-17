import type { Input } from '$lib/input/Input.svelte.js';
import type { Node } from '$lib/Node.js';
import type { Output } from '$lib/output/Output.svelte.js';
import { Vector } from '$lib/space/Vector.js';

export class DevNode implements Node {
	public inputs: Input[] = [];
	public outputs: Output[] = [];
	public position: Vector = $state(Vector.zero());

	constructor(
		public id: string,
		public size: Vector,
		public type: string,
		public extras: Record<string, number>
	) {}
}
