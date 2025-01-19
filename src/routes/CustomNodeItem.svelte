<script lang="ts">
	import NodeItem from '$lib/node/NodeItem.svelte';
	import NodeMover from '$lib/node/NodeMover.svelte';
	import type { OnMoveCallbackParams } from '$lib/node/OnMoveCallbackParams.js';
	import CustomConnectorItem from './CustomConnectorItem.svelte';
	import type { DevNode } from './DevNode.svelte.js';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	interface Props {
		node: DevNode;
	}

	const { node }: Props = $props();

	function onMove({
		node,
		initialMousePosition,
		initialNodePosition,
		mousePosition,
	}: OnMoveCallbackParams) {
		node.position = initialNodePosition.add(mousePosition).subtract(initialMousePosition);
	}
</script>

<NodeItem {node}>
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
