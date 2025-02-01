<script lang="ts">
	import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
	import { PreviewConnectionPointerStrategy } from '$lib/connection/PreviewConnectionPointerStrategy.js';
	import { ConnectionItem, NodeList, PreviewConnectionWire, type Connection } from '$lib/index.js';
	import { SelectionBoxPointerStrategy } from '$lib/selection/SelectionBoxPointerStrategy.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';
	import CustomSelectionBox from './CustomSelectionBox.svelte';
	import CustomWire from './CustomWire.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	const { customNodes, connections }: Props = $props();

	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(() => {});
	const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy();

	const previewConnectionContext = getPreviewConnectionContext();
	const pointerStrategy = $derived(
		previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);
	// const pointerStrategy = previewConnectionPointerStrategy;
</script>

<div class="outer-div">
	<NodeList {pointerStrategy}>
		<div class="inner-div">
			{#each customNodes as node (node.id)}
				<CustomNodeItem {node} />
			{/each}
			{#each connections as connection (connection.id)}
				<ConnectionItem {connection}>
					{#snippet children({ startPosition, endPosition })}
						<CustomWire {startPosition} {endPosition} />
					{/snippet}
				</ConnectionItem>
			{/each}
			<PreviewConnectionWire>
				{#snippet children({ startPosition, endPosition })}
					<CustomWire {startPosition} {endPosition} />
				{/snippet}
			</PreviewConnectionWire>
			<CustomSelectionBox />
			hello
		</div>
	</NodeList>
</div>

<style>
	.outer-div {
		flex-shrink: 0;
	}

	.inner-div {
		display: flex;
		min-width: max-content;
		min-height: max-content;
		flex-shrink: 0;
		overflow: hidden;
		user-select: none;
		position: relative;
		background-color: cyan;
	}
</style>
