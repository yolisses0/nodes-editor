<script lang="ts">
	import { ConnectionItem, NodeList, PreviewConnectionWire, type Connection } from '$lib/index.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';
	import CustomWire from './CustomWire.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	const { customNodes, connections }: Props = $props();
</script>

<NodeList>
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
</NodeList>
