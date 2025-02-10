import type { ConnectionCondition } from '$lib/connector/ConnectionCondition.js';

export const customConnectionCondition: ConnectionCondition = ({
	endConnectorId,
	startConnectorId,
}) => {
	console.log(startConnectorId, endConnectorId);
	// this will probably be a more robust checking in your app
	const isStartANode = startConnectorId.includes('node');
	const isEndANode = endConnectorId.includes('node');
	return isStartANode !== isEndANode;
};
