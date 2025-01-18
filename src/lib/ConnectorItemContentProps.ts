import type { Connector } from './Connector.js';
import type { Vector } from './Vector.js';

export type ConnectorItemContentProps = {
	connector: Connector;
	updateConnectorPosition(id: string, position: Vector): void;
};
