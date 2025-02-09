<script lang="ts">
	import { type Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { MoveEvent } from './events/MoveEvent.js';
	import { MoverPointerStrategy } from './MovePointerStrategy.js';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		onMove?: (e: MoveEvent) => void;
		onEndMove?: (e: MoveEvent) => void;
		onStartMove?: (e: MoveEvent) => void;
		onContextMenu?: (e: MouseEvent) => void;
	}

	let element = $state<Element>();
	const props: Props = $props();
	const { children, onMove, onEndMove, onStartMove, onContextMenu } = props;

	const moverPointerStrategy = $derived(
		new MoverPointerStrategy(element!, {
			onMove,
			onEndMove,
			onStartMove,
		}),
	);
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={element}
	oncontextmenu={onContextMenu}
	onpointerup={moverPointerStrategy.onpointerup}
	onpointerdown={moverPointerStrategy.onpointerdown}
	onpointermove={moverPointerStrategy.onpointermove}
	{...props}
>
	{@render children()}
</div>
