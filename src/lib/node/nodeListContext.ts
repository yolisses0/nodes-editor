import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';

export type NodeListContext = {
	nodeList: Element | undefined;
};

const nodeListContextKey = Symbol('nodeListContextKey');

export function setNodeListContext(nodeListContext: NodeListContext) {
	setContext(nodeListContextKey, nodeListContext);
}

export function getNodeListContext() {
	return getContextOrThrow<NodeListContext>(nodeListContextKey);
}
