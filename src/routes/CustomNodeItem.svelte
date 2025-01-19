<script lang="ts">
	import NodeItem from '$lib/node/NodeItem.svelte';
	import type { NodeItemContentProps } from '$lib/node/NodeItemContentProps.js';
	import CustomConnectorItem from './CustomConnectorItem.svelte';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	const { node }: NodeItemContentProps = $props();
</script>

<NodeItem {node}>
	<div class="node-item-content">
		<div>
			{node.id}
		</div>
		<VariableSizeComponent />
		{#if node.id !== 'devNode3'}
			<div>some options not related to the core node structure</div>
		{/if}
		{#each node.connectors as connector (connector.id)}
			<CustomConnectorItem {connector} />
		{/each}
	</div>
</NodeItem>

<style>
	.node-item-content {
		color: white;
		max-width: 200px;
		user-select: none;
		background-color: gray;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
