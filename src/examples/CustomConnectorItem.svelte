<script lang="ts">
	import {
		ConnectorJoint,
		PointerEventDispatcher,
		StartConnectorAreaPointerStrategy,
	} from '$lib/index.js';
	import type { CustomConnector } from './CustomConnector.js';
	import JointCircle from './JointCircle.svelte';

	interface Props {
		connector: CustomConnector;
	}

	const { connector }: Props = $props();
	const startConnectorAreaPointerStrategy = new StartConnectorAreaPointerStrategy(connector);
</script>

<PointerEventDispatcher pointerStrategy={startConnectorAreaPointerStrategy}>
	<div class="custom-connector-item">
		<ConnectorJoint connectorId={connector.id}>
			<JointCircle />
		</ConnectorJoint>
		<div>{connector.id}</div>
	</div>
</PointerEventDispatcher>

<style>
	.custom-connector-item {
		align-items: center;
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.custom-connector-item:hover {
		background-color: #fff4;
	}
</style>
