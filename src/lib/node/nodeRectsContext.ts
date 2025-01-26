import { getContext, setContext } from 'svelte';
import type { Rect } from './Rect.js';

export type NodeRectsContext = {
	nodeRects: Record<string, Rect>;
};

const nodeRectsContextKey = Symbol('nodeRectsContextKey');

export function setNodeRectsContext(nodeRectsContext: NodeRectsContext) {
	setContext(nodeRectsContextKey, nodeRectsContext);
}

export function getNodeRectsContext() {
	return getContext(nodeRectsContextKey) as NodeRectsContext;
}
