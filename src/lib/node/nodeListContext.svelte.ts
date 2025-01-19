import { getContext, setContext } from 'svelte';

const nodeListKey = Symbol('nodeList');

export function setNodeListContext(nodeList: Element | undefined) {
	console.log('setNodeListContext', nodeList);
	setContext(nodeListKey, nodeList);
}

export function getNodeListContext() {
	return getContext(nodeListKey) as Element | undefined;
}
