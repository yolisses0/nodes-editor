<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';

	interface Props {
		node: Node;
		content: Snippet<[{ node: Node }]>;
	}

	const { node, content }: Props = $props();
</script>

<div class="node-item" style:left={node.position.x + 'px'} style:top={node.position.y + 'px'}>
	{@render content({ node })}
</div>

<style>
	.node-item {
		position: absolute;
		width: fit-content;
		border: solid 1px red;
	}
</style>
