<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getNodeListContext } from './nodeListContext.js';
	import type { PointerStrategy } from './PointerStrategy.js';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		pointerStrategy: PointerStrategy;
	}

	const props: Props = $props();
	const nodeListContext = getNodeListContext();
	const { children, pointerStrategy } = $derived(props);
	let previousPointerStrategy = $state<PointerStrategy>();

	// The pointer down event is set during a pointer down-up interval. It is
	// used to prevent to allow the pointerStrategy.onpointerdown even if the
	// pointerStrategy change was caused in the previous pointerStrategy
	// onpointerdown.
	//
	// This feature can be replaced if it proves to assumes to much of how the
	// component will be used.
	let pointerDownEvent = $state<PointerEvent>();

	$effect(() => {
		if (pointerStrategy !== previousPointerStrategy) {
			previousPointerStrategy?.cleanup?.();
			previousPointerStrategy = pointerStrategy;
			if (pointerDownEvent) {
				pointerStrategy.onpointerdown?.(pointerDownEvent);
			}
		}
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:node-list={true}
	bind:this={nodeListContext.nodeList}
	onpointerup={(e) => {
		pointerStrategy.onpointerup?.(e);
		pointerDownEvent = undefined;
	}}
	onpointermove={pointerStrategy.onpointermove}
	oncontextmenu={pointerStrategy.oncontextmenu}
	onpointerdown={(e) => {
		pointerStrategy.onpointerdown?.(e);
		pointerDownEvent = e;
	}}
	onpointerleave={pointerStrategy.onpointerleave}
	{...props}
>
	{@render children()}
</div>

<style>
	.node-list {
		flex: 1;
		display: flex;
		overflow: hidden;
		position: relative;
	}
</style>
