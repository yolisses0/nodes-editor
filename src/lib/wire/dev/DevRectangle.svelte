<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import type { Vector } from '$lib/space/Vector.js';

	const { space, position, size }: { space: Space; position: Vector; size: Vector } = $props();

	const screenOneSize = $derived(space.getScreenSize(size));
	const screenZeroPosition = $derived(space.getScreenPosition(position));
</script>

<rect
	fill="blue"
	width={screenOneSize.x}
	height={screenOneSize.y}
	x={screenZeroPosition.x}
	y={screenZeroPosition.y}
/>
