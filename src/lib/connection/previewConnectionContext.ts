import { getContext, setContext } from 'svelte';

export type PreviewConnectionContext = {
	endConnectorId?: string;
	startConnectorId?: string;
};

const previewConnectionContextKey = Symbol('previewConnectionContextKey');

export function setPreviewConnectionContext(previewConnectionContext: PreviewConnectionContext) {
	setContext(previewConnectionContextKey, previewConnectionContext);
}

export function getPreviewConnectionContext() {
	return getContext(previewConnectionContextKey) as PreviewConnectionContext;
}
