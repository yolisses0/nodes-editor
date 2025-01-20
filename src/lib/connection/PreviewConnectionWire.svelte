<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Vector } from '$lib/space/Vector.js';
	import type { Snippet } from 'svelte';
	import {
		getPreviewConnectionContext,
		type PreviewConnectionContext,
	} from './previewConnectionContext.js';

	interface Props {
		children: Snippet<
			[
				{
					endPosition: Vector;
					startPosition: Vector;
					previewConnectionContext: PreviewConnectionContext;
				},
			]
		>;
	}

	const { children }: Props = $props();

	const previewConnectionContext = getPreviewConnectionContext();
	const connectorPositions = getConnectorPositionsContext();
	const startPosition = $derived(
		previewConnectionContext.startConnector?.id
			? connectorPositions[previewConnectionContext.startConnector.id]
			: undefined,
	);
	const endPosition = $derived(
		previewConnectionContext.endConnector?.id
			? connectorPositions[previewConnectionContext.endConnector.id]
			: previewConnectionContext.mousePosition,
	);
</script>

{#if startPosition && endPosition}
	{@render children({ startPosition, endPosition, previewConnectionContext })}
{/if}
