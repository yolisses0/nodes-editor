<script lang="ts">
	import { connectorJointElementPrefix } from '../connector/connectorJointElementPrefix.js';
	import { getElementCenter } from '../connector/getElementCenter.js';
	import { Vector } from '../space/Vector.js';
	import Wire from '../wire/Wire.svelte';
	import type { Connection } from './Connection.js';

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
