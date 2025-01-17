<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import type { Input } from './Input.js';
	import InputItem from './InputItem.svelte';

	interface Props {
		space: Space;
		inputs: Input[];
	}

	let { space, inputs }: Props = $props();
</script>

{#each inputs as input (input.id)}
	<InputItem {space} {input} />
{/each}
