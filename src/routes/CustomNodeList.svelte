<script lang="ts">
	import type { Connection } from '$lib/connection/Connection.js';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import PreviewConnectionWire from '$lib/connection/PreviewConnectionWire.svelte';
	import NodeList from '$lib/node/NodeList.svelte';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	const { customNodes: nodes, connections }: Props = $props();
</script>

<NodeList>
	{#each nodes as node (node.id)}
		<CustomNodeItem {node} />
	{/each}
	{#each connections as connection (connection.id)}
		<ConnectionItem {connection} />
	{/each}
	<PreviewConnectionWire />
</NodeList>
