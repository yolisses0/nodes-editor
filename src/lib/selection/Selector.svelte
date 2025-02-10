<script lang="ts">
	import PointerEventDispatcher from '$lib/node/PointerEventDispatcher.svelte';
	import type { Snippet } from 'svelte';
	import { SelectOnClickPointerStrategy } from './SelectOnClickPointerStrategy.js';

	interface Props {
		id: string;
		children: Snippet;
	}

	const { id, children }: Props = $props();

	const selectOnClickPointerStrategy = new SelectOnClickPointerStrategy(id);
</script>

<PointerEventDispatcher pointerStrategy={selectOnClickPointerStrategy}>
	{@render children?.()}
</PointerEventDispatcher>
