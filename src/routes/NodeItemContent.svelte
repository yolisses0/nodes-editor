<script lang="ts">
	import type { Node } from '$lib/Node.js';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
</script>

<div class="node-item-content">
	{node.id}
</div>

<style>
	.node-item-content {
		color: white;
		background-color: gray;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
