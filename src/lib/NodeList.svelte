<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ZOOM } from '../routes/ZOOM.js';
	import type { Node } from './Node.js';
	import NodeItem from './NodeItem.svelte';
	import type { NodeItemContentProps } from './NodeItemContentProps.js';
	import { Vector } from './Vector.js';
	import Wire from './Wire.svelte';

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
	<Wire
		startPosition={new Vector(0 * ZOOM, 0 * ZOOM)}
		endPosition={new Vector(1 * ZOOM, 1 * ZOOM)}
	/>
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
