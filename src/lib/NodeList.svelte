<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		nodes: Node[];
		content: Snippet<[{ node: Node }]>;
	}

	const { nodes, content }: Props = $props();
</script>

<div class="node-list">
	{#each nodes as node (node.id)}
		<NodeItem {node} {content} />
	{/each}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
