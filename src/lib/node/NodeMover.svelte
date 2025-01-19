<script lang="ts">
	import { getElementPosition } from '$lib/connector/getElementPosition.js';
	import { Vector } from '$lib/space/Vector.js';
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import { getNodeListContext } from './nodeListContext.js';

	type OnMoveCallbackParams = {
		node: Node;
		position: Vector;
	};

	type OnMoveCallback = (params: OnMoveCallbackParams) => void;

	interface Props {
		node: Node;
		children: Snippet;
		onMove: OnMoveCallback;
	}

	let isMoving = false;
	let element: Element;
	const nodeListContext = getNodeListContext();
	const { children, onMove, node }: Props = $props();

	function handlePointerDown(e: PointerEvent) {
		element.setPointerCapture(e.pointerId);
		isMoving = true;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!nodeListContext.nodeList) return;
		const position = new Vector(e.clientX, e.clientY).subtract(
			getElementPosition(nodeListContext.nodeList),
		);
		onMove({ position, node });
	}

	function handlePointerUp(e: PointerEvent) {
		isMoving = false;
		element.releasePointerCapture(e.pointerId);
	}
</script>

<button bind:this={element} onpointerdown={handlePointerDown} onpointerup={handlePointerUp}>
	{@render children()}
</button>
