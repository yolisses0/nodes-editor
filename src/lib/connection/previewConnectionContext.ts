import type { Connector } from '$lib/connector/Connector.js';
import { getContextOrThrow } from '$lib/contexts/getContextOrThrow.js';
import { setContext } from 'svelte';

export type PreviewConnectionContext<T extends Connector = Connector> = {
	endConnector?: T;
	startConnector?: T;
};

export const previewConnectionContextKey = Symbol('previewConnectionContextKey');

export function setPreviewConnectionContext<T extends Connector = Connector>(
	previewConnectionContext: PreviewConnectionContext<T>,
) {
	setContext(previewConnectionContextKey, previewConnectionContext);
}

export function getPreviewConnectionContext<T extends Connector = Connector>() {
	return getContextOrThrow<PreviewConnectionContext<T>>(previewConnectionContextKey);
}
