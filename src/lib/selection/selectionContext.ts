import type { Vector } from '$lib/space/Vector.js';
import { getContext, setContext } from 'svelte';

export type SelectionContext = {
	endPosition?: Vector;
	startPosition?: Vector;
};

const selectionContextKey = Symbol('selectionContextKey');

export function setSelectionContext(selectionContext: SelectionContext) {
	setContext(selectionContextKey, selectionContext);
}

export function getSelectionContext() {
	return getContext(selectionContextKey) as SelectionContext;
}
