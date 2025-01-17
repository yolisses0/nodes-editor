<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		content: Snippet<[]>;
	}

	const { content }: Props = $props();
</script>

<div class="connector-item">
	{@render content()}
</div>

<style>
	.connector-item {
		border: solid 1px blue;
	}
</style>
