<script lang="ts">
	import { ConnectorArea, ConnectorJoint } from '$lib/index.js';
	import type { CustomConnector } from './CustomConnector.js';

	interface Props {
		connector: CustomConnector;
	}

	const { connector }: Props = $props();
</script>

<ConnectorArea connectorId={connector.id}>
	<div class="custom-connector-item">
		<ConnectorJoint connectorId={connector.id}>
			<div class="joint-circle"></div>
		</ConnectorJoint>
		<div>{connector}</div>
	</div>
</ConnectorArea>

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
