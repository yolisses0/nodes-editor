<script lang="ts">
	import { NodeItem, NodeMover } from '$lib/index.js';
	import type { MoveNodeEvent } from '$lib/node/events/MoveNodeEvent.js';
	import CustomConnectorItem from './CustomConnectorItem.svelte';
	import type { CustomNode } from './CustomNode.svelte.js';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	interface Props {
		node: CustomNode;
	}

	const { node }: Props = $props();

	function onMove({
		node,
		mousePosition,
		initialNodePosition,
		initialMousePosition,
	}: MoveNodeEvent) {
		node.position = initialNodePosition.add(mousePosition).subtract(initialMousePosition);
	}
</script>

<NodeItem position={node.position}>
	<div class="custom-node-item">
		<NodeMover {node} {onMove}>
			<div>
				{node.id}
			</div>
		</NodeMover>
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
