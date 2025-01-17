import type { Connector } from '../connector/Connector.js';
import type { Input } from '../input/Input.js';
import type { Node } from '../Node.js';

export interface Output extends Connector {
	node: Node; // TODO consider removing this
	connectedInputs: Input[];
}
