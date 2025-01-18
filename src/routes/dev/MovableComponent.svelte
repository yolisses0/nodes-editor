<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let element: Element;
	let top = $state(10);
	let left = $state(10);
	let isSliding = false;

	function handlePointerDown(e: PointerEvent) {
		if (!element) return;
		element.setPointerCapture(e.pointerId);
		isSliding = true;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!element) return;
		if (!isSliding) return;
		top = e.clientY;
		left = e.clientX;
	}

	function handlePointerUp(e: PointerEvent) {
		if (!element) return;
		element.releasePointerCapture(e.pointerId);
		isSliding = false;
	}
</script>

<div
	bind:this={element}
	style:top={top + 'px'}
	style:left={left + 'px'}
	onpointerup={handlePointerUp}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
>
	{@render children()}
</div>

<style>
	div {
		outline: 2px solid blue;
		padding: 10px;
		position: relative;
		width: min-content;
		user-select: none;
	}
</style>
