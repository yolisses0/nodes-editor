<script lang="ts">
	import type { ConnectorItemContentProps } from '$lib/ConnectorItemContentProps.js';
	import { Vector } from '$lib/Vector.js';

	let element = $state<Element>();

	const { connector, updateConnectorPosition }: ConnectorItemContentProps = $props();

	$effect(() => {
		if (!element) return;
		var rect = element.getBoundingClientRect();
		updateConnectorPosition(connector.id, new Vector(rect.left, rect.top));
	});
</script>

<div class="connector-item-content">
	<div class="joint-circle" bind:this={element}></div>
	<div>{connector.id}</div>
</div>

<style>
	.joint-circle {
		background-color: green;
		border-radius: 100%;
		aspect-ratio: 1;
		width: 10px;
	}

	.connector-item-content {
		gap: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.connector-item-content:hover {
		background-color: #fff4;
	}
</style>
