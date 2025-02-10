<script lang="ts">
	import {
		ConnectorJoint,
		EmptyPointerStrategy,
		getPreviewConnectionContext,
		MoverPointerStrategy,
		PointerEventDispatcher,
		SelectOnClickPointerStrategy,
		Vector,
		type MoveEvent,
	} from '$lib/index.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import JointCircle from './JointCircle.svelte';

	interface Props {
		node: CustomNode;
	}

	let element = $state<Element>();
	const { node }: Props = $props();
	// This initial value should not matter
	let initialNodePosition = $state(Vector.zero());

	function onStartMove() {
		initialNodePosition = node.position;
	}

	function onMove({ mouseRelativePosition, initialMouseRelativePosition }: MoveEvent) {
		node.position = initialNodePosition
			.add(mouseRelativePosition)
			.subtract(initialMouseRelativePosition);
	}

	const previewConnectionContext = getPreviewConnectionContext();
	const emptyPointerStrategy = new EmptyPointerStrategy();
	const selectOnClickPointerStrategy = new SelectOnClickPointerStrategy(node.id);
	const moverPointerStrategy = $derived(
		element ? new MoverPointerStrategy(element, { onMove, onStartMove }) : undefined,
	);

	const pointerStrategy = $derived.by(() => {
		// If connecting
		if (previewConnectionContext.startConnectorId) {
			return emptyPointerStrategy;
		}

		if (moverPointerStrategy) {
			return moverPointerStrategy;
		}

		return emptyPointerStrategy;
	});
</script>

<PointerEventDispatcher
	{pointerStrategy}
	onpointerdown={(e) => {
		selectOnClickPointerStrategy.onpointerdown(e);
		moverPointerStrategy?.onpointerdown(e);
	}}
>
	<div class="custom-node-item-header" bind:this={element}>
		{node.id}
		<ConnectorJoint connectorId={node.id}>
			<JointCircle />
		</ConnectorJoint>
	</div>
	<div>
		{pointerStrategy.constructor.name}
	</div>
</PointerEventDispatcher>

<style>
	.custom-node-item-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.custom-node-item-header:hover {
		background-color: #fff2;
	}
</style>
