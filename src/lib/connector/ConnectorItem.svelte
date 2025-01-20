<script lang="ts">
	import { getNodeListContext } from '$lib/node/nodeListContext.js';
	import { RectObserver } from 'rect-observer';
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import { getConnectorPositionsContext } from './connectorPositionsContext.js';
	import { getElementCenter } from './getElementCenter.js';
	import { getElementPosition } from './getElementPosition.js';

	interface Props {
		connector: Connector;
		children: Snippet;
	}

	let element: Element;
	const nodeListContext = getNodeListContext();
	const { children, connector }: Props = $props();
	const connectorPositions = getConnectorPositionsContext();

	function createObserver(nodeList: Element, element: Element) {
		const observer = new RectObserver(
			() => {
				if (!nodeListContext.nodeList) return;
				const rootPosition = getElementPosition(nodeListContext.nodeList);
				connectorPositions[connector.id] = getElementCenter(element).subtract(rootPosition);
			},
			{ root: nodeList },
		);
		observer.observe(element);
		return observer;
	}

	$effect(() => {
		if (nodeListContext.nodeList) {
			const observer = createObserver(nodeListContext.nodeList, element);
			return () => observer.disconnect();
		}
	});
</script>

<div class="connector-item" bind:this={element}>
	{@render children()}
</div>
