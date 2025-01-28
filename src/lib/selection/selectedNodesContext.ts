import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';

export type SelectedNodesContext = {
	selectedNodes: Record<string, boolean | undefined>;
};

const selectedNodesContextKey = Symbol('selectedNodesContextKey');

export function setSelectedNodesContext(selectedNodesContext: SelectedNodesContext) {
	setContext(selectedNodesContextKey, selectedNodesContext);
}

export function getSelectedNodesContext() {
	return getContextOrThrow<SelectedNodesContext>(selectedNodesContextKey);
}
