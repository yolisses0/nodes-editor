<script lang="ts">
	import { getLinePathD, Vector, WirePath, WireSvg } from '$lib/index.js';

	interface Props {
		endPosition: Vector;
		startPosition: Vector;
	}

	const { endPosition, startPosition }: Props = $props();
</script>

<WireSvg {startPosition} {endPosition} margin={new Vector(10, 10)}>
	<WirePath getPathD={getLinePathD} {startPosition} {endPosition} />
</WireSvg>
