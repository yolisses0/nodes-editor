<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	function handleMouseEnter(e: MouseEvent) {
		console.log('mouse enter');
	}
</script>

<button onmouseenter={handleMouseEnter}>
	{@render children()}
</button>
