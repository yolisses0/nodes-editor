<script lang="ts">
	import { Vector } from '../Vector.js';
	import { getVectorsString } from './getVectorsString.js';
	import WirePath from './WirePath.svelte';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}

	const { startPosition, endPosition }: Props = $props();

	const margin = new Vector(10, 10);
	const position = startPosition.min(endPosition).subtract(margin);
	const size = endPosition.subtract(startPosition).absolute().add(margin.multiplyNumber(2));
</script>

<svg
	class="wire"
	style:width={size.x + 'px'}
	style:height={size.y + 'px'}
	style:top={position.y + 'px'}
	style:left={position.x + 'px'}
	style="background-color: red;"
	viewBox={getVectorsString([position, size])}
>
	<WirePath {startPosition} {endPosition} />
</svg>

<style>
	.wire {
		position: absolute;
	}
</style>
