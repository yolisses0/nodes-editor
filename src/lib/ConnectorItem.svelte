<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ConnectorItemContentProps } from './ConnectorItemContentProps.js';
	import type { Vector } from './Vector.js';

	interface Props {
		content: Snippet<[ConnectorItemContentProps]>;
		updateConnectorPosition(id: string, position: Vector): void;
	}

	const { content, updateConnectorPosition }: Props = $props();
</script>

<div class="connector-item">
	{@render content({ updateConnectorPosition })}
</div>

<style>
	.connector-item {
		border: solid 1px blue;
	}
</style>
