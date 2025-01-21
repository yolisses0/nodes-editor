import type { Connector } from '$lib/connector/Connector.js';
import type { Vector } from '$lib/space/Vector.js';

export type EndPreviewConnectionEvent = {
	mousePosition: Vector;
	endConnector?: Connector;
	startConnector: Connector;
};
