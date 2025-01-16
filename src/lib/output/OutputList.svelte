<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import type { Output } from './Output.svelte.js';
	import OutputItem from './OutputItem.svelte';

	interface Props {
		space: Space;
		editor: Editor;
		outputs: Output[];
	}

	let { space, editor, outputs }: Props = $props();
</script>

{#each outputs as output (output.id)}
	<OutputItem {editor} {space} {output} />
{/each}
