<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSelectionBoxContext, type SelectionBoxContext } from './selectionBoxContext.js';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	const selectionBoxContext = getSelectionBoxContext();

	const size = $derived(getSize(selectionBoxContext));
	const position = $derived(getPosition(selectionBoxContext));

	function getSize(selectionBoxContext: SelectionBoxContext) {
		if (!selectionBoxContext.startPosition) return;
		if (!selectionBoxContext.endPosition) return;

		return selectionBoxContext.endPosition.subtract(selectionBoxContext.startPosition).absolute();
	}

	function getPosition(selectionBoxContext: SelectionBoxContext) {
		if (!selectionBoxContext.startPosition) return;
		if (!selectionBoxContext.endPosition) return;

		return selectionBoxContext.endPosition.min(selectionBoxContext.startPosition);
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
