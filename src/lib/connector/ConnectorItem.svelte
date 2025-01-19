<script lang="ts">
	import { getNodeListContext } from '$lib/node/nodeListContext.js';
	import { RectObserver } from 'rect-observer';
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import { getConnectorPositionsContext } from './connectorPositionsContext.js';
	import { getElementCenter } from './getElementCenter.js';

	interface Props {
		connector: Connector;
		children: Snippet;
	}

	let element: Element;
	const nodeListContext = getNodeListContext();
	const { children, connector }: Props = $props();
	const connectorPositions = getConnectorPositionsContext();

	$inspect(nodeListContext);

	$effect(() => {
		if (!nodeListContext.nodeList) return;

		const observer = new RectObserver(
			() => {
				connectorPositions[connector.id] = getElementCenter(element);
			},
			{ root: nodeListContext.nodeList },
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div class="connector-item" bind:this={element}>
	{@render children()}
</div>

<style>
	.connector-item {
		border: solid 1px blue;
	}
</style>
