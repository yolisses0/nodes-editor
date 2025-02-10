<script lang="ts">
	import { ConnectorArea, ConnectorJoint } from '$lib/index.js';
	import type { CustomConnector } from './CustomConnector.js';
	import JointCircle from './JointCircle.svelte';

	interface Props {
		connector: CustomConnector;
	}

	const { connector }: Props = $props();
</script>

<ConnectorArea connectorId={connector.id}>
	<div class="custom-connector-item">
		<ConnectorJoint connectorId={connector.id}>
			<JointCircle />
		</ConnectorJoint>
		<div>{connector.id}</div>
	</div>
</ConnectorArea>

<style>
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
