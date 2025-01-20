<script lang="ts">
	import { getElementPosition } from '$lib/connector/getElementPosition.js';
	import { Vector } from '$lib/space/Vector.js';
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import { getNodeListContext } from './nodeListContext.js';
	import type { OnMoveCallback } from './OnMoveCallback.js';

	interface Props {
		node: Node;
		children: Snippet;
		onMove: OnMoveCallback;
	}

	let isMoving = false;
	let element: Element;
	let initialNodeOffset: Vector;
	let initialNodePosition: Vector;
	let initialMousePosition: Vector;
	const nodeListContext = getNodeListContext();
	const { children, onMove, node }: Props = $props();

	function handlePointerDown(e: PointerEvent) {
		if (!nodeListContext.nodeList) return;
		element.setPointerCapture(e.pointerId);
		isMoving = true;
		initialNodePosition = node.position;
		initialMousePosition = new Vector(e.clientX, e.clientY);
		initialNodeOffset = initialMousePosition.subtract(getElementPosition(nodeListContext.nodeList));
	}

	function handlePointerMove(e: PointerEvent) {
		if (!isMoving) return;
		if (!nodeListContext.nodeList) return;
		const mousePosition = new Vector(e.clientX, e.clientY);
		onMove({
			node,
			mousePosition,
			initialNodeOffset,
			initialNodePosition,
			initialMousePosition,
		});
	}

	function handlePointerUp(e: PointerEvent) {
		isMoving = false;
		element.releasePointerCapture(e.pointerId);
	}
</script>

<button
	class="node-mover"
	bind:this={element}
	onpointerup={handlePointerUp}
	onpointermove={handlePointerMove}
	onpointerdown={handlePointerDown}
>
	{@render children()}
</button>

<style>
	.node-mover {
		display: contents;
	}
</style>
