<script lang="ts">
	import {
		ConnectorAreaPointerStrategy,
		ConnectorJoint,
		PointerEventDispatcher,
	} from '$lib/index.js';
	import { customConnectionCondition } from './customConnectionCondition.js';
	import type { CustomConnector } from './CustomConnector.js';
	import JointCircle from './JointCircle.svelte';

	interface Props {
		connector: CustomConnector;
	}

	const { connector }: Props = $props();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		connector,
		customConnectionCondition,
	);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	<div class="custom-connector-item">
		<ConnectorJoint connectorId={connector.id}>
			<JointCircle />
		</ConnectorJoint>
		<div>{connector.id}</div>
	</div>
</PointerEventDispatcher>

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
