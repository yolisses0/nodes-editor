<script lang="ts">
	import { getNodeListContext } from '$lib/node/nodeListContext.svelte.js';
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
	const { children, connector }: Props = $props();
	const connectorPositions = getConnectorPositionsContext();

	function createObserver(nodeList: Element, element: Element) {
		const observer = new RectObserver(
			() => {
				connectorPositions[connector.id] = getElementCenter(element);
			},
			{ root: nodeList },
		);
		observer.observe(element);
		return observer;
	}

	const nodeList = getNodeListContext();
	$inspect(nodeList);
	$effect(() => {
		if (nodeList) {
			const observer = createObserver(nodeList, element);
			return () => observer.disconnect();
		}
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
