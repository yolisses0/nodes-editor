import { getContext, setContext } from 'svelte';

const nodeListKey = 'nodeListKey';

type NodeListContext = {
	nodeList: Element | undefined;
};

export function setNodeListContext(nodeListContext: NodeListContext) {
	return setContext(nodeListKey, nodeListContext);
}

export function getNodeListContext() {
	return getContext(nodeListKey) as NodeListContext;
}
