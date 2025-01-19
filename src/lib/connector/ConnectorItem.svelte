<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import type { ConnectorItemContentProps } from './ConnectorItemContentProps.js';

	interface Props {
		connector: Connector;
		content: Snippet<[ConnectorItemContentProps]>;
	}

	const { content, connector }: Props = $props();
</script>

<div class="connector-item">
	{@render content({ connector })}
</div>

<style>
	.connector-item {
		border: solid 1px blue;
	}
</style>
