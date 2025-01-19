import type { Connector } from '$lib/connector/Connector.js';
import type { Vector } from '$lib/space/Vector.js';

export interface Node {
	id: string;
	position: Vector;
	connectors: Connector[];
}
