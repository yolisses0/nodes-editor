<script lang="ts">
	import type { ConnectorItemContentProps } from '$lib/connector/ConnectorItemContentProps.js';
	import { connectorJointElementPrefix } from '$lib/connector/connectorJointElementPrefix.js';

	const { connector }: ConnectorItemContentProps = $props();
</script>

<div class="connector-item-content">
	<div class="joint-circle" id={connectorJointElementPrefix + connector.id}></div>
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
