import { getContext, setContext } from 'svelte.js';
import type { ContainerWrapper } from './ContainerWrapper.js';

const containerKey = Symbol('container');

export function setContainerContext(containerWrapper: ContainerWrapper) {
	setContext(containerKey, containerWrapper);
}

export function getContainerContext(): ContainerWrapper {
	return getContext(containerKey) as ContainerWrapper;
}
