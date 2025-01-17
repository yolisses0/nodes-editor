<script lang="ts">
	import type { Node } from './Node.js';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
</script>

<div class="node-item" style:left={node.position.x + 'px'} style:top={node.position.y + 'px'}>
	{node.id}
</div>

<style>
	.node-item {
		position: relative;
		border: solid 1px red;
	}
</style>
