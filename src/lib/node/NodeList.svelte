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
	const { children, pointerStrategy } = props;
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class:node-list={true} bind:this={nodeListContext.nodeList} {...pointerStrategy} {...props}>
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
