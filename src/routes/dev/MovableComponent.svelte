<script lang="ts">
	interface Props {
		element?: Element;
		container: Element;
	}

	let { element = $bindable(), container }: Props = $props();

	let top = $state(10);
	let left = $state(10);
	let width = $state(50);
	let isSliding = false;

	function handlePointerDown(e: PointerEvent) {
		if (!element) return;
		element.setPointerCapture(e.pointerId);
		isSliding = true;

		console.log('down');
	}

	function handlePointerMove(e: PointerEvent) {
		if (!element) return;
		if (!isSliding) return;
		const rect = container.getBoundingClientRect();
		top = e.clientY - rect.top;
		left = e.clientX - rect.left;
		width = width + 0.1;
	}

	function handlePointerUp(e: PointerEvent) {
		if (!element) return;
		element.releasePointerCapture(e.pointerId);
		console.log('up');
	}
</script>

<div
	bind:this={element}
	style:top={top + 'px'}
	style:left={left + 'px'}
	style:width={width + 'px'}
	onpointerup={handlePointerUp}
	onpointerdown={handlePointerDown}
	onpointermove={handlePointerMove}
>
	content
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
