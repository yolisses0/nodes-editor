<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getRectFromPositions } from './getRectFromPositions.js';
	import { getSelectionBoxContext } from './selectionBoxContext.js';

	interface Props {
		children?: Snippet;
	}

	const { children }: Props = $props();

	const selectionBoxContext = getSelectionBoxContext();

	const rect = $derived.by(() => {
		const { endPosition, startPosition } = selectionBoxContext;
		if (!endPosition) return;
		if (!startPosition) return;
		return getRectFromPositions(startPosition, endPosition);
	});
</script>

{#if rect}
	<div
		style:position="absolute"
		class:selection-box={true}
		style:width={rect.size.x + 'px'}
		style:height={rect.size.y + 'px'}
		style:top={rect.position.y + 'px'}
		style:left={rect.position.x + 'px'}
	>
		{@render children?.()}
	</div>
{/if}
