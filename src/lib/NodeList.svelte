<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';

	interface Props {
		nodes: Node[];
		content: Snippet<[{ node: Node }]>;
	}

	const { nodes, content }: Props = $props();
</script>

{@render content({ node: nodes[0] })}

<!-- <div class="node-list">
	{#each nodes as node (node.id)}
		<NodeItem {node} />
	{/each}
</div> -->

<style>
	.node-list {
		position: relative;
	}
</style>
