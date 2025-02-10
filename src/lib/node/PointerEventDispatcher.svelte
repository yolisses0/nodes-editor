<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { PointerStrategy } from './PointerStrategy.js';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		pointerStrategy: PointerStrategy;
	}

	const props: Props = $props();
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

<!-- These arrow function bindings seems to be necessary, but the cause is
unknown -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	onmousedown={(e) => pointerStrategy.onmousedown?.(e)}
	onmousemove={(e) => pointerStrategy.onmousemove?.(e)}
	onmouseenter={(e) => pointerStrategy.onmouseenter?.(e)}
	onmouseleave={(e) => pointerStrategy.onmouseleave?.(e)}
	oncontextmenu={(e) => pointerStrategy.oncontextmenu?.(e)}
	onpointermove={(e) => pointerStrategy.onpointermove?.(e)}
	onpointerenter={(e) => pointerStrategy.onpointerenter?.(e)}
	onpointerleave={(e) => pointerStrategy.onpointerleave?.(e)}
	onpointerup={(e) => {
		pointerStrategy.onpointerup?.(e);
		// pointerDownEvent = undefined;
	}}
	onpointerdown={(e) => {
		pointerStrategy.onpointerdown?.(e);
		// pointerDownEvent = e;
	}}
	{...props}
>
	{@render children()}
</div>
