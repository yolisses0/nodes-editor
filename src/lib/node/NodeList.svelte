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
	bind:this={nodeListContext.nodeList}
	onpointermove={pointerStrategy.onpointermove}
	oncontextmenu={pointerStrategy.oncontextmenu}
	onpointerleave={pointerStrategy.onpointerleave}
	onpointerup={(e) => {
		pointerStrategy.onpointerup?.(e);
		pointerDownEvent = undefined;
	}}
	onpointerdown={(e) => {
		pointerStrategy.onpointerdown?.(e);
		pointerDownEvent = e;
	}}
	{...props}
>
	{@render children()}
</div>
