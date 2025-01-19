<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import Wire from '$lib/wire/Wire.svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext.js';

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
	<Wire {startPosition} {endPosition}></Wire>
{/if}
