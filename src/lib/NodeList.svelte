<script lang="ts">
	import type { Node } from './Node.js';
	import NodeItem from './NodeItem.svelte';

	interface Props {
		nodes: Node[];
	}

	const { nodes }: Props = $props();
</script>

<div>
	{#each nodes as node (node.id)}
		<NodeItem {node} />
	{/each}
</div>
