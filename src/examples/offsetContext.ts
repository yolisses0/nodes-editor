import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import type { Vector } from '$lib/index.js';
import { setContext } from 'svelte';

export type OffsetContext = {
	offset: Vector;
};

const offsetContextKey = Symbol('offsetContextKey');

export function setOffsetContext(offsetContext: OffsetContext) {
	setContext(offsetContextKey, offsetContext);
}

export function getOffsetContext() {
	return getContextOrThrow<OffsetContext>(offsetContextKey);
}
