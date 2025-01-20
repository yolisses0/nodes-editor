<script lang="ts">
	import { getConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Vector } from '$lib/space/Vector.js';
	import type { Snippet } from 'svelte';
	import type { Connection } from './Connection.js';

	interface Props {
		connection: Connection;
		children: Snippet<[{ endPosition: Vector; startPosition: Vector }]>;
	}

	const { children, connection }: Props = $props();

	const connectorPositions = getConnectorPositionsContext();
	const startPosition = $derived(connectorPositions[connection.startConnectorId]);
	const endPosition = $derived(connectorPositions[connection.endConnectorId]);
</script>

{#if startPosition && endPosition}
	{@render children({ startPosition, endPosition })}
{/if}
