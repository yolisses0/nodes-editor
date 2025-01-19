<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import Wire from '../wire/Wire.svelte';
	import type { Connection } from './Connection.js';

	interface Props {
		connection: Connection;
	}

	const { connection }: Props = $props();

	const connectorPositions = getConnectorPositionsContext();
	const startPosition = $derived(connectorPositions[connection.startConnectorId]);
	const endPosition = $derived(connectorPositions[connection.endConnectorId]);
</script>

{#if startPosition && endPosition}
	<Wire {startPosition} {endPosition} />
{/if}
