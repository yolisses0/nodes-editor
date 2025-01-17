<script lang="ts">
	import ConnectorItem from '$lib/ConnectorItem.svelte';
	import type { ConnectorItemContentProps } from '$lib/ConnectorItemContentProps.js';
	import type { NodeItemContentProps } from '$lib/NodeItemContentProps.js';
	import ConnectorItemContent from './ConnectorItemContent.svelte';

	const { node, updateConnectorPosition }: NodeItemContentProps = $props();
</script>

{#snippet connectorContent({ updateConnectorPosition }: ConnectorItemContentProps)}
	<ConnectorItemContent {updateConnectorPosition} />
{/snippet}

<div class="node-item-content">
	<div>
		{node.id}
	</div>
	<div>some options not related to the core node structure</div>
	<ConnectorItem content={connectorContent} {updateConnectorPosition} />
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
