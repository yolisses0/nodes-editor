import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';

export type RootElementContext = {
	rootElement?: HTMLElement;
};

const rootElementContextKey = Symbol('rootElementContextKey');

export function setRootElementContext(rootElementContext: RootElementContext) {
	setContext(rootElementContextKey, rootElementContext);
}

export function getRootElementContext() {
	return getContextOrThrow<RootElementContext>(rootElementContextKey);
}
