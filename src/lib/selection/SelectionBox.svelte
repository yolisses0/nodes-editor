<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSelectionContext, type SelectionContext } from './selectionContext.js';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	const selectionContext = getSelectionContext();

	const size = $derived(getSize(selectionContext));
	const position = $derived(getPosition(selectionContext));

	function getSize(selectionContext: SelectionContext) {
		if (!selectionContext.startPosition) return;
		if (!selectionContext.endPosition) return;

		return selectionContext.endPosition.subtract(selectionContext.startPosition).absolute();
	}

	function getPosition(selectionContext: SelectionContext) {
		if (!selectionContext.startPosition) return;
		if (!selectionContext.endPosition) return;

		return selectionContext.endPosition.min(selectionContext.startPosition);
	}
</script>

{#if position && size}
	<div
		style:position="absolute"
		class:selection-box={true}
		style:width={size.x + 'px'}
		style:height={size.y + 'px'}
		style:top={position.y + 'px'}
		style:left={position.x + 'px'}
	>
		{@render children?.()}
	</div>
{/if}
