import type { Node } from './Node.js';
import type { Vector } from './Vector.js';

export type NodeItemContentProps = {
	node: Node;
	updateConnectorPosition(id: string, position: Vector): void;
};
