<script lang="ts">
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	const { children }: Props = $props();

	const connectorPositions: ConnectorPositions = $state({});
	setConnectorPositionsContext(connectorPositions);
</script>

<div class="node-list">
	{@render children()}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
