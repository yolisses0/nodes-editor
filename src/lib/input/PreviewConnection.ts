import type { Vector } from '$lib/space/Vector.js';
import type { Connector } from '../connector/Connector.js';

export type PreviewConnection = {
	startConnector: Connector;
	endConnector?: Connector;
	dataPointerPosition: Vector;
};
