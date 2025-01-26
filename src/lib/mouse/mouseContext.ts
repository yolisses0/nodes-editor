import type { Vector } from '$lib/space/Vector.js';
import { getContext, setContext } from 'svelte';

export type MouseContext = {
	mouseRelativePosition: Vector;
};

const mouseContextKey = Symbol('mouseContextKey');

export function setMouseContext(mouseContext: MouseContext) {
	setContext(mouseContextKey, mouseContext);
}

export function getMouseContext() {
	return getContext(mouseContextKey) as MouseContext;
}
