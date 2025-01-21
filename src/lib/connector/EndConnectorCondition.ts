import type { Connector } from './Connector.js';

export type EndConnectorCondition = (endConnector: Connector, startConnector: Connector) => boolean;
