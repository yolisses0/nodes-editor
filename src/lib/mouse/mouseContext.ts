import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import type { Vector } from '$lib/space/Vector.js';
import { setContext } from 'svelte';

export type MouseContext = {
	mouseRelativePosition: Vector;
};

export const mouseContextKey = Symbol('mouseContextKey');

export function setMouseContext(mouseContext: MouseContext) {
	setContext(mouseContextKey, mouseContext);
}

export function getMouseContext() {
	return getContextOrThrow<MouseContext>(mouseContextKey);
}
