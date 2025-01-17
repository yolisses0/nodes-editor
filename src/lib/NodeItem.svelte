<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import type { NodeItemContentProps } from './NodeItemContentProps.js';
	import type { Vector } from './Vector.js';

	interface Props {
		node: Node;
		content: Snippet<[NodeItemContentProps]>;
		updateConnectorPosition(id: string, position: Vector): void;
	}

	const { node, content, updateConnectorPosition }: Props = $props();
</script>

<div class="node-item" style:left={node.position.x + 'px'} style:top={node.position.y + 'px'}>
	{@render content({ node, updateConnectorPosition })}
</div>

<style>
	.node-item {
		position: absolute;
		width: fit-content;
		border: solid 1px red;
	}
</style>
