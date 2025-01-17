<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		content: Snippet<[]>;
	}

	const { content }: Props = $props();
</script>

<div>
	{@render content()}
</div>
