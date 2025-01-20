<script lang="ts">
	import { Vector } from '$lib/space/Vector.js';
	import type { GetPathD } from './GetPathD.js';

	interface Props {
		getPathD: GetPathD;
		endPosition: Vector;
		startPosition: Vector;
	}
	const { startPosition, endPosition, getPathD }: Props = $props();
</script>

<path
	stroke="green"
	class="wire-path"
	fill="transparent"
	stroke-width="5px"
	d={getPathD(startPosition, endPosition)}
/>
