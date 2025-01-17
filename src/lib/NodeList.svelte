<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import NodeItem from './NodeItem.svelte';
	import type { NodeItemContentProps } from './NodeItemContentProps.js';
	import type { Vector } from './Vector.js';

	interface Props {
		nodes: Node[];
		content: Snippet<[NodeItemContentProps]>;
	}

	const { nodes, content }: Props = $props();

	const connectorPositions = $state<Record<string, Vector>>({});

	function updateConnectorPosition(id: string, position: Vector) {
		connectorPositions[id] = position;
	}

	$inspect(connectorPositions);
</script>

<div class="node-list">
	{#each nodes as node (node.id)}
		<NodeItem {node} {content} {updateConnectorPosition} />
	{/each}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
