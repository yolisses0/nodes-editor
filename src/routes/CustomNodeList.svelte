<script lang="ts">
	import type { Connection } from '$lib/connection/Connection.js';
	import ConnectionItem from '$lib/connection/ConnectionItem.svelte';
	import type { Node } from '$lib/node/Node.js';
	import NodeList from '$lib/node/NodeList.svelte';
	import CustomNodeItem from './CustomNodeItem.svelte';

	interface Props {
		nodes: Node[];
		connections: Connection[];
	}

	const { nodes, connections }: Props = $props();
</script>

<NodeList>
	{#each nodes as node (node.id)}
		<CustomNodeItem {node} />
	{/each}
	{#each connections as connection (connection.id)}
		<ConnectionItem {connection} />
	{/each}
</NodeList>
