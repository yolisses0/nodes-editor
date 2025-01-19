import { getContext, setContext } from 'svelte';

export type NodeListContext = {
	nodeList: Element | undefined;
};

const nodeListContextKey = Symbol('nodeListContextKey');

export function setNodeListContext(nodeListContext: NodeListContext) {
	setContext(nodeListContextKey, nodeListContext);
}

export function getNodeListContext() {
	return getContext(nodeListContextKey) as NodeListContext;
}
