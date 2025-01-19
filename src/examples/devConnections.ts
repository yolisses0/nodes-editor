import type { Connection } from '$lib/connection/Connection.js';

export const devConnections: Connection[] = [
	{ id: 'connection1', startConnectorId: 'connector2.1', endConnectorId: 'connector1.1' },
	{ id: 'connection2', startConnectorId: 'connector3.1', endConnectorId: 'connector1.2' },
];
