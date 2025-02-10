import type { ConnectionCondition } from '$lib/index.js';

export const customConnectionCondition: ConnectionCondition = ({
	endConnectorId,
	startConnectorId,
}) => {
	// this will probably be a more robust checking in your app
	const isStartANode = startConnectorId.includes('Node');
	const isEndANode = endConnectorId.includes('Node');
	return isStartANode !== isEndANode;
};
