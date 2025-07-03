import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import type { Vector } from '$lib/space/Vector.js';
import { setContext } from 'svelte';

export type SelectionBoxContext = {
	endPosition?: Vector;
	startPosition?: Vector;
};

export const selectionBoxContextKey = Symbol('selectionBoxContextKey');

export function setSelectionBoxContext(selectionBoxContext: SelectionBoxContext) {
	setContext(selectionBoxContextKey, selectionBoxContext);
}

export function getSelectionBoxContext() {
	return getContextOrThrow<SelectionBoxContext>(selectionBoxContextKey);
}
