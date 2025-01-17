<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';

	interface Props {
		node: Node;
		component: Snippet<{ node: Node }>;
	}

	const { node, component }: Props = $props();
</script>

<div class="node-item" style:left={node.position.x + 'px'} style:top={node.position.y + 'px'}>
	{@render component?.({ node })}
</div>

<style>
	.node-item {
		position: relative;
		border: solid 1px red;
	}
</style>
