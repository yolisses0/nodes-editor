<script lang="ts">
	import type { Connector } from '$lib/connector/Connector.js';
	import ConnectorItem from '$lib/connector/ConnectorItem.svelte';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();
</script>

<div class="connector-item-content">
	<ConnectorItem {connector}>
		<div class="joint-circle"></div>
	</ConnectorItem>
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
