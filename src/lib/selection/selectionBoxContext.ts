import type { Vector } from '$lib/space/Vector.js';
import { getContext, setContext } from 'svelte';

export type SelectionBoxContext = {
	endPosition?: Vector;
	startPosition?: Vector;
};

const selectionBoxContextKey = Symbol('selectionBoxContextKey');

export function setSelectionBoxContext(selectionBoxContext: SelectionBoxContext) {
	setContext(selectionBoxContextKey, selectionBoxContext);
}

export function getSelectionBoxContext() {
	return getContext(selectionBoxContextKey) as SelectionBoxContext;
}
