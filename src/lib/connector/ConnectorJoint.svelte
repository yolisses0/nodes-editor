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

	function createObserver({ rootElement, element }: { rootElement: Element; element: Element }) {
		const callback = () => {
			if (!rootElementContext.rootElement) return;
			const rootPosition = getElementPosition(rootElementContext.rootElement);
			const position = getElementCenter(element).subtract(rootPosition);
			connectorPositions[connectorId] = position;
		};

		const observer = new RectObserver(callback, { root: rootElement });
		observer.observe(element);
		return observer;
	}

	$effect(() => {
		const { rootElement } = rootElementContext;
		if (rootElement) {
			const observer = createObserver({ element, rootElement });
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
