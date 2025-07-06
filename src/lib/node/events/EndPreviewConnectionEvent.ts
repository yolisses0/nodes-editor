import type { Connector } from '$lib/connector/Connector.js';
import type { Vector } from '$lib/space/Vector.js';

export type EndPreviewConnectionEvent<T extends Connector = Connector> = {
	endConnector?: T;
	startConnector: T;
	mousePosition: Vector;
};
