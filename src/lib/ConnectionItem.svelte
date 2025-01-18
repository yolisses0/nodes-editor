<script lang="ts">
	import type { Connection } from './Connection.js';
	import { connectorJointElementPrefix } from './connectorJointElementPrefix.js';
	import { getElementCenter } from './getElementCenter.js';
	import { Vector } from './Vector.js';
	import Wire from './wire/Wire.svelte';

	interface Props {
		connection: Connection;
	}

	const { connection }: Props = $props();

	let startPosition = $state<Vector>();
	let endPosition = $state<Vector>();

	$effect(() => {
		const { startConnectorId, endConnectorId } = connection;

		const startConnectorElement = document.getElementById(
			connectorJointElementPrefix + startConnectorId,
		);
		const endConnectorElement = document.getElementById(
			connectorJointElementPrefix + endConnectorId,
		);

		if (startConnectorElement) {
			startPosition = getElementCenter(startConnectorElement);
		}
		if (endConnectorElement) {
			endPosition = getElementCenter(endConnectorElement);
		}
	});
</script>

{#if startPosition && endPosition}
	<Wire {startPosition} {endPosition} />
{/if}
