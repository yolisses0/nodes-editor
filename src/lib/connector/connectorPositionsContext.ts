import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';
import type { ConnectorPositions } from './ConnectorPositions.js';

export function setConnectorPositionsContext(connectorPositions: ConnectorPositions) {
	return setContext(connectorPositionsKey, connectorPositions);
}

export const connectorPositionsKey = Symbol('connectorPositionsKey');

export function getConnectorPositionsContext() {
	return getContextOrThrow<ConnectorPositions>(connectorPositionsKey);
}
