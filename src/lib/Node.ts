import type { Connector } from './Connector.js';
import type { Vector } from './Vector.js';

export interface Node {
	id: string;
	position: Vector;
	connectors: Connector[];
}
