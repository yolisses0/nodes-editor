<script lang="ts">
	import { NodeItem, Vector } from '$lib/index.js';
	import type { MoveEvent } from '$lib/node/events/MoveEvent.js';
	import Mover from '$lib/node/Mover.svelte';
	import { getSelectedNodeIdsContext } from '$lib/selection/selectedNodeIdsContext.js';
	import Selector from '$lib/selection/Selector.svelte';
	import CustomConnectorItem from './CustomConnectorItem.svelte';
	import type { CustomNode } from './CustomNode.svelte.js';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	interface Props {
		node: CustomNode;
	}

	const { node }: Props = $props();
	// This initial value should not matter
	let initialNodePosition = $state(Vector.zero());
	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));

	function onStartMove() {
		initialNodePosition = node.position;
	}

	function onMove({ mouseRelativePosition, initialMouseRelativePosition }: MoveEvent) {
		node.position = initialNodePosition
			.add(mouseRelativePosition)
			.subtract(initialMouseRelativePosition);
	}
</script>

<NodeItem {node} position={node.position}>
	{'' + isSelected}
	<div class="custom-node-item" class:selected={isSelected}>
		<Selector id={node.id}>
			<Mover {onMove} {onStartMove}>
				<div>
					{node.id}
				</div>
			</Mover>
		</Selector>
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

	.selected {
		outline: 2px red solid;
	}
</style>
