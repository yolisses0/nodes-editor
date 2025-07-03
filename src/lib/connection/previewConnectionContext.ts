import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';

export type PreviewConnectionContext = {
	endConnectorId?: string;
	startConnectorId?: string;
};

export const previewConnectionContextKey = Symbol('previewConnectionContextKey');

export function setPreviewConnectionContext(previewConnectionContext: PreviewConnectionContext) {
	setContext(previewConnectionContextKey, previewConnectionContext);
}

export function getPreviewConnectionContext() {
	return getContextOrThrow<PreviewConnectionContext>(previewConnectionContextKey);
}
