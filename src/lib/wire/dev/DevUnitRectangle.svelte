<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import { Vector } from '$lib/space/Vector.js';
	import DevRectangle from './DevRectangle.svelte';

	const { space }: { space: Space } = $props();
</script>

<DevRectangle {space} size={Vector.one()} position={Vector.zero()} />
