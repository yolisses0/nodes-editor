<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import { getMouseContext } from '$lib/mouse/mouseContext.js';
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

	const mouseContext = getMouseContext();
	const connectorPositions = getConnectorPositionsContext();
	const previewConnectionContext = getPreviewConnectionContext();

	const startPosition = $derived(
		previewConnectionContext.startConnector
			? connectorPositions[previewConnectionContext.startConnector.id]
			: undefined,
	);
	const endPosition = $derived(
		previewConnectionContext.endConnector
			? connectorPositions[previewConnectionContext.endConnector.id]
			: mouseContext.mouseRelativePosition,
	);
</script>

{#if startPosition && endPosition}
	{@render children({ startPosition, endPosition, previewConnectionContext })}
{/if}
