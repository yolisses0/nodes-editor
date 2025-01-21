<script lang="ts">
	import { Vector } from '$lib/space/Vector.js';
	import { getElementPosition } from '$lib/ui/getElementPosition.js';
	import { type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { MoveNodeEvent } from './events/MoveNodeEvent.js';
	import type { Node } from './Node.js';
	import { getNodeListContext } from './nodeListContext.js';

	interface Props extends HTMLButtonAttributes {
		node: Node;
		children: Snippet;
		onMove?: (e: MoveNodeEvent) => void;
		onEndMove?: (e: MoveNodeEvent) => void;
		onContextMenu?: (e: MouseEvent) => void;
	}

	let element: Element;
	let initialPosition: Vector;
	let isMoving = $state(false);
	let initialNodePosition: Vector;
	let initialMousePosition: Vector;
	const nodeListContext = getNodeListContext();

	const props: Props = $props();
	const { children, onMove, node, onEndMove, onContextMenu } = props;

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		element.setPointerCapture(e.pointerId);
		isMoving = true;
		initialNodePosition = node.position;
		initialMousePosition = new Vector(e.clientX, e.clientY);
		initialPosition = initialMousePosition.subtract(getElementPosition(nodeListContext.nodeList));
	}

	function handlePointerMove(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		const mousePosition = new Vector(e.clientX, e.clientY);
		const position = mousePosition.subtract(getElementPosition(nodeListContext.nodeList));
		onMove?.({
			node,
			position,
			mousePosition,
			initialPosition,
			initialNodePosition,
			initialMousePosition,
		});
	}

	function handlePointerUp(e: PointerEvent) {
		isMoving = false;
		element.releasePointerCapture(e.pointerId);

		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		const mousePosition = new Vector(e.clientX, e.clientY);
		const position = mousePosition.subtract(getElementPosition(nodeListContext.nodeList));
		onEndMove?.({
			node,
			position,
			mousePosition,
			initialPosition,
			initialNodePosition,
			initialMousePosition,
		});
	}
</script>

<button
	class="node-mover"
	bind:this={element}
	onpointerup={handlePointerUp}
	oncontextmenu={onContextMenu}
	onpointerdown={handlePointerDown}
	onpointermove={isMoving ? handlePointerMove : undefined}
	{...props}
>
	{@render children()}
</button>

<style>
	.node-mover {
		display: contents;
	}
</style>
