<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Vector } from '../space/Vector.js';
	import { getVectorsString } from './getVectorsString.js';

	interface Props {
		margin: Vector;
		children: Snippet;
		endPosition: Vector;
		startPosition: Vector;
	}

	const { margin, children, endPosition, startPosition }: Props = $props();

	const position = $derived(startPosition.min(endPosition).subtract(margin));
	const size = $derived(
		endPosition.subtract(startPosition).absolute().add(margin.multiplyByNumber(2)),
	);
</script>

<svg
	class="wire"
	style:width={size.x + 'px'}
	style:height={size.y + 'px'}
	style:top={position.y + 'px'}
	style:left={position.x + 'px'}
	viewBox={getVectorsString([position, size])}
>
	{@render children()}
</svg>

<style>
	.wire {
		position: absolute;
		pointer-events: none;
	}
</style>
