<script lang="ts">
	import type { Node } from '$lib/node/Node.js';
	import NodeItem from '$lib/node/NodeItem.svelte';
	import CustomConnectorItem from './CustomConnectorItem.svelte';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
</script>

<NodeItem {node}>
	<div class="custom-node-item">
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
	.custom-node-item {
		color: white;
		max-width: 200px;
		user-select: none;
		background-color: gray;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
