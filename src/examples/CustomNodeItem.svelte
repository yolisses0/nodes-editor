<script lang="ts">
	import {
		ConnectorAreaPointerStrategy,
		NodeItem,
		PointerEventDispatcher,
		getSelectedNodeIdsContext,
	} from '$lib/index.js';
	import { customConnectionCondition } from './customConnectionCondition.js';
	import CustomConnectorItem from './CustomConnectorItem.svelte';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItemHeader from './CustomNodeItemHeader.svelte';
	import VariableSizeComponent from './VariableSizeComponent.svelte';

	interface Props {
		node: CustomNode;
	}

	const { node }: Props = $props();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();
	const isSelected = $derived(selectedNodeIdsContext.selectedNodeIds.has(node.id));

	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		node.id,
		customConnectionCondition,
	);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	<NodeItem {node} position={node.position}>
		<div class="custom-node-item" class:selected={isSelected}>
			<CustomNodeItemHeader {node} />
			<VariableSizeComponent />
			{#if node.id !== 'devNode3'}
				<div>some options not related to the core node structure</div>
			{/if}
			{#each node.connectors as connectorId (connectorId)}
				<CustomConnectorItem connector={connectorId} />
			{/each}
		</div>
	</NodeItem>
</PointerEventDispatcher>

<style>
	.custom-node-item {
		color: white;
		max-width: 200px;
		user-select: none;
		background-color: gray;
		outline: solid 1px black;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	.selected {
		outline: 2px red solid;
	}
</style>
