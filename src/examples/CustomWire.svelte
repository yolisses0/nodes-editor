<script lang="ts">
	import { getLinePathD, Vector } from '$lib/index.js';
	import WirePath from '$lib/wire/WirePath.svelte';
	import WireSvg from '$lib/wire/WireSvg.svelte';

	interface Props {
		endPosition: Vector;
		startPosition: Vector;
	}

	const { endPosition, startPosition }: Props = $props();
</script>

<WireSvg {startPosition} {endPosition} margin={new Vector(10, 10)}>
	<WirePath getPathD={getLinePathD} {startPosition} {endPosition} />
</WireSvg>
