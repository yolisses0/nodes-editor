<script lang="ts">
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Snippet } from 'svelte';
	import { setNodeListContext } from './nodeListContext.js';

	interface Props {
		children: Snippet;
	}

	let element = $state<Element>();
	const { children }: Props = $props();
	const connectorPositions: ConnectorPositions = $state({});

	$inspect(element);

	setConnectorPositionsContext(connectorPositions);
	$effect(() => {
		setNodeListContext({ nodeList: element });
	});
</script>

<div class="node-list" bind:this={element}>
	{@render children()}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
