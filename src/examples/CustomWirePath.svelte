<script lang="ts">
	import { type GetPathD, Vector, WirePath } from '$lib/index.js';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
		getPathD: GetPathD;
	}

	const { getPathD, endPosition, startPosition }: Props = $props();
</script>

<WirePath {getPathD} {endPosition} {startPosition} />
