// TODO use destructuring to prevent errors
export type ConnectionCondition = (params: {
	endConnectorId: string;
	startConnectorId: string;
}) => boolean;
