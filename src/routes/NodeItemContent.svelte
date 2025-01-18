<script lang="ts">
	import ConnectorItem from '$lib/ConnectorItem.svelte';
	import type { ConnectorItemContentProps } from '$lib/ConnectorItemContentProps.js';
	import type { NodeItemContentProps } from '$lib/NodeItemContentProps.js';
	import ConnectorItemContent from './ConnectorItemContent.svelte';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	const { node, updateConnectorPosition }: NodeItemContentProps = $props();
</script>

{#snippet connectorContent({ connector, updateConnectorPosition }: ConnectorItemContentProps)}
	<ConnectorItemContent {connector} {updateConnectorPosition} />
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
		<ConnectorItem {connector} content={connectorContent} {updateConnectorPosition} />
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
