<script lang="ts">
	import { getRootElementContext } from '$lib/node/rootElementContext.js';
	import { getElementPosition } from '$lib/ui/getElementPosition.js';
	import { RectObserver } from 'rect-observer';
	import { onMount, type Snippet } from 'svelte';
	import { getConnectorPositionsContext } from './connectorPositionsContext.js';
	import { getElementCenter } from './getElementCenter.js';

	interface Props {
		children?: Snippet;
		connectorId: string;
	}

	let rectObserver: RectObserver;
	let element = $state.raw<HTMLElement>();
	const rootElementContext = getRootElementContext();
	const { children, connectorId }: Props = $props();
	const connectorPositionsContext = getConnectorPositionsContext();

	const callback = () => {
		console.log('callback');
		if (!element) return;
		const { rootElement } = rootElementContext;
		if (!rootElement) return;

		const elementCenter = getElementCenter(element);
		const rootPosition = getElementPosition(rootElement);
		connectorPositionsContext[connectorId] = elementCenter.subtract(rootPosition);
	};

	$effect(() => {
		if (!element) return;
		const { rootElement } = rootElementContext;
		if (!rootElement) return;

		rectObserver = new RectObserver(callback, element, rootElement);
		return () => rectObserver.disconnect();
	});

	onMount(() => {
		return () => {
			rectObserver?.disconnect();
			delete connectorPositionsContext[connectorId];
		};
	});
</script>

<div class="connector-item" bind:this={element}>
	{@render children?.()}
</div>
