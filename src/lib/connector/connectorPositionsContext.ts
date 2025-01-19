import { getContext, setContext } from 'svelte';
import type { ConnectorPositions } from './ConnectorPositions.js';

const connectorPositionsKey = 'connectorPositionsKey';

export function setConnectorPositionsContext(connectorPositions: ConnectorPositions) {
	return setContext(connectorPositionsKey, connectorPositions);
}

export function getConnectorPositionsContext() {
	return getContext(connectorPositionsKey) as ConnectorPositions;
}
