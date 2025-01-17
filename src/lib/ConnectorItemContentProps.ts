import type { Vector } from './Vector.js';

export type ConnectorItemContentProps = {
	updateConnectorPosition(id: string, position: Vector): void;
};
