<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Vector } from '$lib/space/Vector.js';
	import type { Snippet } from 'svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext.js';

	interface Props {
		children: Snippet<[{ endPosition: Vector; startPosition: Vector }]>;
	}

	const { children }: Props = $props();

	const previewConnection = getPreviewConnectionContext();
	const connectorPositions = getConnectorPositionsContext();
	const startPosition = $derived(
		previewConnection.startConnectorId
			? connectorPositions[previewConnection.startConnectorId]
			: undefined,
	);
	const endPosition = $derived(
		previewConnection.endConnectorId
			? connectorPositions[previewConnection.endConnectorId]
			: previewConnection.mousePosition,
	);
</script>

{#if startPosition && endPosition}
	{@render children({ startPosition, endPosition })}
{/if}
