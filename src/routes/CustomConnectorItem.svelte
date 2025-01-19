<script lang="ts">
	import type { Connector } from '$lib/connector/Connector.js';
	import ConnectorItem from '$lib/connector/ConnectorItem.svelte';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();
</script>

<div class="custom-connector-item">
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

	.custom-connector-item {
		gap: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.custom-connector-item:hover {
		background-color: #fff4;
	}
</style>
