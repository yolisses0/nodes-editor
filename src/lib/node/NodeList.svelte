<script lang="ts">
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Snippet } from 'svelte';
	import { setNodeListContext } from './nodeListContext.svelte.js';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();

	const connectorPositions: ConnectorPositions = $state({});
	setConnectorPositionsContext(connectorPositions);

	let element = $state<Element>();
	$effect(() => {
		setNodeListContext(element);
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
