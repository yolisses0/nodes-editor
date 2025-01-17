<script lang="ts">
	import type { ConnectorItemContentProps } from '$lib/ConnectorItemContentProps.js';
	import { Vector } from '$lib/Vector.js';

	let element = $state<Element>();

	const { updateConnectorPosition }: ConnectorItemContentProps = $props();

	$effect(() => {
		if (!element) return;

		var rect = element.getBoundingClientRect();

		const devId = '' + Math.random();
		updateConnectorPosition(devId, new Vector(rect.left, rect.top));
	});
</script>

<div class="connector-item-content">
	<div class="joint-circle" bind:this={element}></div>
	<div>Some connector</div>
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
