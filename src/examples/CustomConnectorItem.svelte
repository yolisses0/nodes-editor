<script lang="ts">
	import { type Connector, ConnectorArea, ConnectorItem } from '$lib/index.js';

	interface Props {
		connector: Connector;
	}

	const { connector }: Props = $props();
</script>

<ConnectorArea {connector}>
	<div class="custom-connector-item">
		<ConnectorItem {connector}>
			<div class="joint-circle"></div>
		</ConnectorItem>
		<div>{connector.id}</div>
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
		background-color: aquamarine;
	}

	.custom-connector-item:hover {
		background-color: #fff4;
	}
</style>
