<script lang="ts">
	import { Vector } from '$lib/space/Vector.js';

	import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
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
	let isMoving = $state(false);
	let initialNodePosition: Vector;
	let initialMouseRelativePosition: Vector;
	const nodeListContext = getNodeListContext();

	const props: Props = $props();
	const { children, onMove, node, onEndMove, onContextMenu } = props;

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		element.setPointerCapture(e.pointerId);
		isMoving = true;

		initialNodePosition = node.position;
		initialMouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
	}

	function handlePointerMove(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
		onMove?.({
			node,
			initialNodePosition,
			mouseRelativePosition,
			initialMouseRelativePosition,
		});
	}

	function handlePointerUp(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
		onEndMove?.({
			node,
			initialNodePosition,
			mouseRelativePosition,
			initialMouseRelativePosition,
		});

		isMoving = false;
		element.releasePointerCapture(e.pointerId);
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
