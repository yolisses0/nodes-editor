<script lang="ts">
	import { Vector } from '$lib/space/Vector.js';
	import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
	import { type Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import type { MoveEvent } from './events/MoveEvent.js';
	import { getNodeListContext } from './nodeListContext.js';

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
		onMove?: (e: MoveEvent) => void;
		onEndMove?: (e: MoveEvent) => void;
		onStartMove?: (e: MoveEvent) => void;
		onContextMenu?: (e: MouseEvent) => void;
	}

	let moved = false;
	let element: Element;
	let isMoving = $state(false);
	let initialMouseRelativePosition: Vector;
	const nodeListContext = getNodeListContext();

	const props: Props = $props();
	const { children, onMove, onEndMove, onStartMove, onContextMenu } = props;

	function handlePointerDown(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		element.setPointerCapture(e.pointerId);

		moved = false;
		isMoving = true;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
		initialMouseRelativePosition = mouseRelativePosition;

		onStartMove?.({ mouseRelativePosition, initialMouseRelativePosition });
	}

	function handlePointerMove(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		moved = true;
		const mouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
		onMove?.({ mouseRelativePosition, initialMouseRelativePosition });
	}

	function handlePointerUp(e: PointerEvent) {
		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!nodeListContext.nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
		onEndMove?.({ mouseRelativePosition, initialMouseRelativePosition });

		if (moved) {
			e.stopPropagation();
		}

		moved = false;
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
