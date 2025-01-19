<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import { getConnectorPositionsContext } from './connectorPositionsContext.js';
	import { getElementCenter } from './getElementCenter.js';

	interface Props {
		connector: Connector;
		children: Snippet;
	}

	let element: Element;
	const { children, connector }: Props = $props();
	const connectorPositions = getConnectorPositionsContext();

	$effect(() => {
		connectorPositions[connector.id] = getElementCenter(element);
	});
</script>

<div class="connector-item" bind:this={element}>
	{@render children()}
</div>

<style>
	.connector-item {
		border: solid 1px blue;
	}
</style>
