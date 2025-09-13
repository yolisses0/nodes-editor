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
	import { onMount } from 'svelte';
	import type { CustomNode } from './CustomNode.svelte.js';
	import CustomNodeItem from './CustomNodeItem.svelte';
	import CustomSelectionBox from './CustomSelectionBox.svelte';
	import CustomWire from './CustomWire.svelte';

	interface Props {
		customNodes: CustomNode[];
		connections: Connection[];
	}

	let isTouchDevice = $state<boolean>();

	const { customNodes, connections }: Props = $props();
	const nodeRectsContext = getNodeRectsContext();
	const previewConnectionContext = getPreviewConnectionContext();
	const previewConnectionPointerStrategy = new PreviewConnectionPointerStrategy(() => {});
	const rootElementContext = getRootElementContext();
	const selectionBoxPointerStrategy = $derived(
		new SelectionBoxPointerStrategy(rootElementContext.rootElement!, !!isTouchDevice),
	);

	const pointerStrategy = $derived(
		previewConnectionContext.startConnector
			? previewConnectionPointerStrategy
			: selectionBoxPointerStrategy,
	);

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

	onMount(() => {
		isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	});

	function setIsOverscrollEnabled(isEnabled: boolean) {
		document.getElementsByTagName('html').item(0)!.style.overscrollBehavior = isEnabled
			? 'contain'
			: '';
		document.getElementsByTagName('body').item(0)!.style.overscrollBehavior = isEnabled
			? 'contain'
			: '';
	}

	function handleTouchStart(e: TouchEvent) {
		setIsOverscrollEnabled(true);
		if (selectionBoxPointerStrategy.isActive) {
			e.preventDefault();
		}
	}

	function handleTouchEnd(e: TouchEvent) {
		setIsOverscrollEnabled(false);
		if (selectionBoxPointerStrategy.isActive) {
			e.preventDefault();
		}
	}

	// Maybe it's not required
	function handleTouchMove(e: TouchEvent) {
		if (selectionBoxPointerStrategy.isActive) {
			e.preventDefault();
		}
	}

	$effect(() => {
		// Sveltekit doesn't support passing `passive` in a declarative way,
		// since it has super restrict use cases.
		rootElementContext.rootElement?.addEventListener('touchstart', handleTouchStart, {
			passive: false,
		});
		rootElementContext.rootElement?.addEventListener('touchend', handleTouchEnd, {
			passive: false,
		});
		rootElementContext.rootElement?.addEventListener('touchmove', handleTouchMove, {
			passive: false,
		});

		return () => {
			rootElementContext.rootElement?.removeEventListener('touchstart', handleTouchStart);
			rootElementContext.rootElement?.removeEventListener('touchmove', handleTouchMove);
		};
	});
</script>

<div class="outer-div">
	<PointerEventDispatcher {pointerStrategy}>
		<div
			bind:this={rootElementContext.rootElement}
			class="inner-div"
			style:min-height={minSize.y + 'px'}
			style:min-width={minSize.x + 'px'}
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
