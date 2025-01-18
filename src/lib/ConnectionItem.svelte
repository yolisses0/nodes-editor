<script lang="ts">
	import type { Connection } from './Connection.js';
	import { connectorJointElementPrefix } from './connectorJointElementPrefix.js';
	import { Vector } from './Vector.js';
	import Wire from './wire/Wire.svelte';

	interface Props {
		connection: Connection;
	}

	const { connection }: Props = $props();

	let startPosition = $state<Vector>();
	let endPosition = $state<Vector>();

	$effect(() => {
		const { startConnectorId } = connection;

		const startConnectorElement = document.getElementById(
			connectorJointElementPrefix + startConnectorId,
		);

		console.log(startConnectorElement);
	});
</script>

{#if startPosition && endPosition}
	<Wire {startPosition} {endPosition} />
{/if}
