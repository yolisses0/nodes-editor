<script lang="ts">
	import type { Vector } from '$lib/space/Vector.js';
	import type { Snippet } from 'svelte';

	interface Props {
		position: Vector;
		children: Snippet;
	}

	const { children, position }: Props = $props();
</script>

<div class="node-item" style:left={position.x + 'px'} style:top={position.y + 'px'}>
	{@render children()}
</div>

<style>
	.node-item {
		position: absolute;
		width: fit-content;
	}
</style>
