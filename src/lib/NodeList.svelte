<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Connection } from './Connection.js';
	import type { Node } from './Node.js';
	import NodeItem from './NodeItem.svelte';
	import type { NodeItemContentProps } from './NodeItemContentProps.js';
	import { Vector } from './Vector.js';
	import Wire from './wire/Wire.svelte';

	interface Props {
		nodes: Node[];
		connections: Connection[];
		content: Snippet<[NodeItemContentProps]>;
	}

	const { nodes, content, connections }: Props = $props();

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
	{#each connections as connection (connection.id)}
		{#if connectorPositions[connection.startConnectorId] && connectorPositions[connection.endConnectorId]}
			<Wire
				startPosition={connectorPositions[connection.startConnectorId]}
				endPosition={connectorPositions[connection.endConnectorId]}
			/>
		{/if}
	{/each}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
