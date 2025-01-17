<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import InputList from './input/InputList.svelte';
	import type { Node } from './Node.js';
	import NodeItemHeader from './NodeItemHeader.svelte';
	import OutputList from './output/OutputList.svelte';
	import type { Vector } from './space/Vector.js';

	interface Props {
		node: Node;
		space: Space;
		changeNodePosition(node: Node, position: Vector): void;
	}

	let { node, space, changeNodePosition }: Props = $props();

	const screenSize = $derived(space.getScreenSize(node.size));
	const screenPosition = $derived(space.getScreenPosition(node.position));
</script>

<div
	class="node-item"
	style:outline-width="0.1lh"
	style:width={screenSize.x + 'px'}
	style:height={screenSize.y + 'px'}
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
>
	<div style:border-radius="0.4lh">
		<NodeItemHeader {node} {space} {changeNodePosition} />
		<OutputList {space} outputs={node.outputs} />
		<InputList {space} inputs={node.inputs} />
	</div>
</div>

<style>
	.node-item {
		display: flex;
		position: absolute;
		flex-direction: column;
		outline: solid 1px red;
	}
</style>
