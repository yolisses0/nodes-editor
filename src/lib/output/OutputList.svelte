<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import type { Output } from './Output.svelte.js';
	import OutputItem from './OutputItem.svelte';

	interface Props {
		space: Space;
		outputs: Output[];
	}

	let { space, outputs }: Props = $props();
</script>

{#each outputs as output (output.id)}
	<OutputItem {space} {output} />
{/each}
