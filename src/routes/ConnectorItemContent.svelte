<script lang="ts">
	import type { ConnectorItemContentProps } from '$lib/ConnectorItemContentProps.js';
	import { connectorJointElementPrefix } from '$lib/connectorJointElementPrefix.js';
	import { Vector } from '$lib/Vector.js';

	let element = $state<Element>();

	const { connector, updateConnectorPosition }: ConnectorItemContentProps = $props();

	$effect(() => {
		if (!element) return;
		var rect = element.getBoundingClientRect();
		const centerPosition = new Vector((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
		updateConnectorPosition(connector.id, centerPosition);
	});
</script>

<div class="connector-item-content">
	<div
		bind:this={element}
		class="joint-circle"
		id={connectorJointElementPrefix + connector.id}
	></div>
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
