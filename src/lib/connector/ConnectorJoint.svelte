<script lang="ts">
	import { getRootElementContext } from '$lib/node/rootElementContext.js';
	import { getElementPosition } from '$lib/ui/getElementPosition.js';
	import { RectObserver } from 'rect-observer';
	import type { Snippet } from 'svelte';
	import { getConnectorPositionsContext } from './connectorPositionsContext.js';
	import { getElementCenter } from './getElementCenter.js';

	interface Props {
		children?: Snippet;
		connectorId: string;
	}

	let element: Element;
	const rootElementContext = getRootElementContext();
	const { children, connectorId }: Props = $props();
	const connectorPositions = getConnectorPositionsContext();

	function createObserver(rootElement: Element, element: Element) {
		const callback = () => {
			if (!rootElementContext.rootElement) return;
			const rootPosition = getElementPosition(rootElementContext.rootElement);
			const position = getElementCenter(element).subtract(rootPosition);
			connectorPositions[connectorId] = position;
		};

		const observer = new RectObserver(callback, { root: rootElement });
		observer.observe(element);
		callback();
		return observer;
	}

	$effect(() => {
		if (rootElementContext.rootElement) {
			const observer = createObserver(rootElementContext.rootElement, element);
			return () => {
				observer.disconnect();
				delete connectorPositions[connectorId];
			};
		}
	});
</script>

<div class="connector-item" bind:this={element}>
	{@render children?.()}
</div>
