<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import { Vector } from '$lib/space/Vector.js';
	import Wire from '$lib/wire/Wire.svelte';
	import { getPreviewConnectionContext } from './previewConnectionContext.js';

	const previewConnection = getPreviewConnectionContext();
	const connectorPositions = getConnectorPositionsContext();
	const startPosition = $derived(
		previewConnection.startConnectorId
			? connectorPositions[previewConnection.startConnectorId]
			: undefined,
	);
</script>

{#if startPosition}
	<Wire {startPosition} endPosition={startPosition.add(new Vector(50, 40))}></Wire>
{/if}
