<script lang="ts">
	import type { Vector } from './Vector.js';

	interface Props {
		startPosition: Vector;
		endPosition: Vector;
	}

	const { startPosition, endPosition }: Props = $props();

	const position = startPosition.min(endPosition);
	const size = endPosition.subtract(startPosition).absolute();
</script>

<svg
	class="wire"
	style:width={size.x + 'px'}
	style:height={size.y + 'px'}
	style:top={position.y + 'px'}
	style:left={position.x + 'px'}
	style="background-color: red;"
/>

<style>
	.wire {
		position: absolute;
	}
</style>
