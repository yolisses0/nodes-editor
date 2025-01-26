<script lang="ts">
	import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
	import {
		ConnectionItem,
		getNodeListContext,
		NodeList,
		PreviewConnectionWire,
		type Connection,
	} from '$lib/index.js';
	import { getMouseContext } from '$lib/mouse/mouseContext.js';
	import { PreviewConnectionPointerStrategy } from '$lib/node/PreviewConnectionPointerStrategy.svelte.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';
	import CustomSelectionBox from './CustomSelectionBox.svelte';
	import CustomWire from './CustomWire.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	const { customNodes, connections }: Props = $props();

	const mouseContext = getMouseContext();
	const nodeListContext = getNodeListContext();
	const previewConnectionContext = getPreviewConnectionContext();

	const previewConnectionPointerStrategy = $derived(
		new PreviewConnectionPointerStrategy((e) => console.log(e)),
	);
	$inspect(nodeListContext.nodeList);
	$inspect(previewConnectionPointerStrategy);
</script>

<NodeList pointerStrategy={previewConnectionPointerStrategy}>
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
