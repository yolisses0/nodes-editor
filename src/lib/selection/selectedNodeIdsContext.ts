import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';
import type { SvelteSet } from 'svelte/reactivity';

export type SelectedNodeIdsContext = {
	selectedNodeIds: SvelteSet<string>;
};

const selectedNodeIdsContextKey = Symbol('selectedNodeIdsContextKey');

export function setSelectedNodeIdsContext(selectedNodeIdsContext: SelectedNodeIdsContext) {
	setContext(selectedNodeIdsContextKey, selectedNodeIdsContext);
}

export function getSelectedNodeIdsContext() {
	return getContextOrThrow<SelectedNodeIdsContext>(selectedNodeIdsContextKey);
}
