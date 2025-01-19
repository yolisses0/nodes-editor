<script lang="ts">
	import { Vector } from '../space/Vector.js';
	import { getVectorsString } from './getVectorsString.js';
	import WirePath from './WirePath.svelte';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}

	const { startPosition, endPosition }: Props = $props();

	const margin = new Vector(10, 10);
	const position = $derived(startPosition.min(endPosition).subtract(margin));
	const size = $derived(
		endPosition.subtract(startPosition).absolute().add(margin.multiplyNumber(2)),
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
	<WirePath {startPosition} {endPosition} />
</svg>

<style>
	.wire {
		position: absolute;
		pointer-events: none;
	}
</style>
