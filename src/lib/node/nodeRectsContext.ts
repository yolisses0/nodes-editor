import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';
import type { Rect } from './Rect.js';

export type NodeRectsContext = {
	nodeRects: Record<string, Rect>;
};

export const nodeRectsContextKey = Symbol('nodeRectsContextKey');

export function setNodeRectsContext(nodeRectsContext: NodeRectsContext) {
	setContext(nodeRectsContextKey, nodeRectsContext);
}

export function getNodeRectsContext() {
	return getContextOrThrow<NodeRectsContext>(nodeRectsContextKey);
}
