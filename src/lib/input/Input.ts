import type { Connector } from '../connector/Connector.js';
import type { Node } from '../Node.js';
import type { Output } from '../output/Output.svelte.js';

export interface Input extends Connector {
	node: Node; // TODO consider removing this
	connectedOutput?: Output;
	connectedOutputId?: string;
}
