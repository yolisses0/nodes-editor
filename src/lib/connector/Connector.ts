import type { Vector } from '$lib/space/Vector.js';

export interface Connector {
	id: string;
	name: string;
	position: Vector;
	jointPosition: Vector;
}
