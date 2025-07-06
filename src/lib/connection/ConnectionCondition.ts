import type { Connector } from '$lib/connector/Connector.js';

// TODO use destructuring to prevent errors
export type ConnectionCondition<T extends Connector = Connector> = (params: {
	endConnector: T;
	startConnector: T;
}) => boolean;
