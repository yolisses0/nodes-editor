import type { ConnectionCondition } from '$lib/index.js';

export const customConnectionCondition: ConnectionCondition = ({
	endConnector,
	startConnector,
}) => {
	// this will probably be a more robust checking in your app
	const isStartANode = startConnector.id.includes('Node');
	const isEndANode = endConnector.id.includes('Node');
	return isStartANode !== isEndANode;
};
