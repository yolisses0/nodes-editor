<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import type { ConnectorItemContentProps } from './ConnectorItemContentProps.js';
	import type { Vector } from './Vector.js';

	interface Props {
		connector: Connector;
		content: Snippet<[ConnectorItemContentProps]>;
		updateConnectorPosition(id: string, position: Vector): void;
	}

	const { content, connector, updateConnectorPosition }: Props = $props();
</script>

<div class="connector-item">
	{@render content({ connector, updateConnectorPosition })}
</div>

<style>
	.connector-item {
		border: solid 1px blue;
	}
</style>
