<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Connection } from './Connection.js';
	import ConnectionItem from './ConnectionItem.svelte';
	import type { Node } from './Node.js';
	import NodeItem from './NodeItem.svelte';
	import type { NodeItemContentProps } from './NodeItemContentProps.js';

	interface Props {
		nodes: Node[];
		connections: Connection[];
		content: Snippet<[NodeItemContentProps]>;
	}

	const { nodes, content, connections }: Props = $props();
</script>

<div class="node-list">
	{#each nodes as node (node.id)}
		<NodeItem {node} {content} />
	{/each}
	{#each connections as connection (connection.id)}
		<ConnectionItem {connection} />
	{/each}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
