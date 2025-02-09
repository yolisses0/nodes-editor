<script lang="ts">
	import { getNodeListContext } from '$lib/node/nodeListContext.js';
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
	const nodeListContext = getNodeListContext();
	const { children, connectorId }: Props = $props();
	const connectorPositions = getConnectorPositionsContext();

	function createObserver(nodeList: Element, element: Element) {
		const observer = new RectObserver(
			() => {
				if (!nodeListContext.nodeList) return;
				const rootPosition = getElementPosition(nodeListContext.nodeList);
				const position = getElementCenter(element).subtract(rootPosition);
				connectorPositions[connectorId] = position;
			},
			{ root: nodeList },
		);
		observer.observe(element);
		return observer;
	}

	$effect(() => {
		if (nodeListContext.nodeList) {
			const observer = createObserver(nodeListContext.nodeList, element);
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
