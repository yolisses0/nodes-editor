<script lang="ts">
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Snippet } from 'svelte';
	import { setNodeListContext, type NodeListContext } from './nodeListContext.svelte.js';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();

	const connectorPositions: ConnectorPositions = $state({});
	setConnectorPositionsContext(connectorPositions);

	const nodeListContext: NodeListContext = $state({
		nodeList: undefined,
	});
	setNodeListContext(nodeListContext);
</script>

<div class="node-list" bind:this={nodeListContext.nodeList}>
	{@render children()}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
