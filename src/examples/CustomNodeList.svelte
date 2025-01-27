<script lang="ts">
	import { ConnectionItem, NodeList, PreviewConnectionWire, type Connection } from '$lib/index.js';
	import { PreviewConnectionPointerStrategy } from '$lib/node/PreviewConnectionPointerStrategy.js';
	import { SelectionBoxPointerStrategy } from '$lib/node/SelectionBoxPointerStrategy.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';
	import CustomSelectionBox from './CustomSelectionBox.svelte';
	import CustomWire from './CustomWire.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	const { customNodes, connections }: Props = $props();

	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(() => {});
	const selectionBoxPointerStrategy = $derived(new SelectionBoxPointerStrategy());
	const pointerStrategy = $derived(selectionBoxPointerStrategy);
</script>

<NodeList {pointerStrategy}>
	{#each customNodes as node (node.id)}
		<CustomNodeItem {node} />
	{/each}
	{#each connections as connection (connection.id)}
		<ConnectionItem {connection}>
			{#snippet children({ startPosition, endPosition })}
				<CustomWire {startPosition} {endPosition} />
			{/snippet}
		</ConnectionItem>
	{/each}
	<PreviewConnectionWire>
		{#snippet children({ startPosition, endPosition })}
			<CustomWire {startPosition} {endPosition} />
		{/snippet}
	</PreviewConnectionWire>
	<CustomSelectionBox />
</NodeList>

<style>
	:global(.node-list) {
		user-select: none;
	}
</style>
