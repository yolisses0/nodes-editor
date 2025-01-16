import { getContext, setContext } from 'svelte';
import type { PreviewConnectionWrapper } from './PreviewConnectionWrapper.js';

const previewConnectionKey = Symbol('previewConnection');

export function setPreviewConnectionContext(previewConnectionWrapper: PreviewConnectionWrapper) {
	return setContext(previewConnectionKey, previewConnectionWrapper);
}

export function getPreviewConnectionContext() {
	return getContext(previewConnectionKey) as PreviewConnectionWrapper;
}
