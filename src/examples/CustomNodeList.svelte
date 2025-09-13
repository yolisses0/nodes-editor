<script lang="ts">
	import {
		ConnectionItem,
		getNodeRectsContext,
		getPreviewConnectionContext,
		getRectsBoundingRect,
		getRootElementContext,
		PointerEventDispatcher,
		PreviewConnectionPointerStrategy,
		PreviewConnectionWire,
		SelectionBoxPointerStrategy,
		Vector,
		type Connection,
	} from '$lib/index.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';
	import CustomSelectionBox from './CustomSelectionBox.svelte';
	import CustomWire from './CustomWire.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	const rootElementContext = getRootElementContext();
	const { customNodes, connections }: Props = $props();

	const selectionBoxPointerStrategy = new SelectionBoxPointerStrategy();
	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(() => {});

	const previewConnectionContext = getPreviewConnectionContext();
	const pointerStrategy = $derived(
		previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);

	const nodeRectsContext = getNodeRectsContext();

	const minSize = $derived.by(() => {
		const nodeRects = Object.values(nodeRectsContext.nodeRects);
		if (nodeRects.length === 0) return Vector.zero();

		const step = 200;
		const boundingRect = getRectsBoundingRect(nodeRects);
		return boundingRect.size
			.add(boundingRect.position)
			.divideByNumber(step)
			.ceil()
			.multiplyByNumber(step);
	});
</script>

<div class="outer-div">
	<PointerEventDispatcher {pointerStrategy}>
		<div
			class="inner-div"
			style:min-width={minSize.x + 'px'}
			style:min-height={minSize.y + 'px'}
			bind:this={rootElementContext.rootElement}
		>
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
		</div>
	</PointerEventDispatcher>
</div>

<style>
	.outer-div {
		flex-shrink: 0;
	}

	.inner-div {
		background-color: cyan;
		display: flex;
		flex-shrink: 0;
		min-height: max-content;
		min-width: max-content;
		overflow: visible;
		position: relative;
		user-select: none;
	}
</style>
