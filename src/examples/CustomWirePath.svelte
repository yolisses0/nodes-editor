<script lang="ts">
	import type { Vector } from '$lib/index.js';
	import type { GetPathD } from '$lib/wire/GetPathD.js';
	import WirePath from '$lib/wire/WirePath.svelte';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
		getPathD: GetPathD;
	}

	const { getPathD, endPosition, startPosition }: Props = $props();
</script>

<WirePath {getPathD} {endPosition} {startPosition} />
