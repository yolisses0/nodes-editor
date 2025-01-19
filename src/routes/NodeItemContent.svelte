<script lang="ts">
	import ConnectorItem from '$lib/connector/ConnectorItem.svelte';
	import type { ConnectorItemContentProps } from '$lib/connector/ConnectorItemContentProps.js';
	import type { NodeItemContentProps } from '$lib/node/NodeItemContentProps.js';
	import ConnectorItemContent from './ConnectorItemContent.svelte';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	const { node }: NodeItemContentProps = $props();
</script>

{#snippet connectorContent({ connector }: ConnectorItemContentProps)}
	<ConnectorItemContent {connector} />
{/snippet}

<div class="node-item-content">
	<div>
		{node.id}
	</div>
	<VariableSizeComponent />
	{#if node.id !== 'devNode3'}
		<div>some options not related to the core node structure</div>
	{/if}
	{#each node.connectors as connector (connector.id)}
		<ConnectorItem {connector} content={connectorContent} />
	{/each}
</div>

<style>
	.node-item-content {
		color: white;
		max-width: 200px;
		user-select: none;
		background-color: gray;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
