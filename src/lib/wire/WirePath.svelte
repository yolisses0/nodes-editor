<script lang="ts">
	import { Vector } from '$lib/space/Vector.js';
	import { clamp } from './clamp.js';
	import { getVectorsString } from './getVectorsString.js';
	import { getVectorString } from './getVectorString.js';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}
	const { startPosition, endPosition }: Props = $props();

	const pathD = $derived(getPathD(startPosition, endPosition));

	// TODO adjust these hard coded values
	function getPathD(start: Vector, end: Vector) {
		let offsetX = (end.x - start.x) / 2;
		if (offsetX < 0) {
			offsetX *= 5;
		}
		offsetX = clamp(offsetX, -5, 5);
		offsetX = Math.abs(offsetX);
		offsetX = Math.min(offsetX, 10);

		const point0 = new Vector(start.x + offsetX, start.y);
		const point1 = new Vector(end.x - offsetX, end.y);

		return (
			'M' + getVectorString(startPosition) + 'C' + getVectorsString([point0, point1, endPosition])
		);
	}
</script>

<path d={pathD} class="wire-path" stroke="green" fill="transparent" stroke-width="5px" />
