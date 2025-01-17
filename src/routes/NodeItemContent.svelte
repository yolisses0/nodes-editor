<script lang="ts">
	import ConnectorItem from '$lib/ConnectorItem.svelte';
	import type { Node } from '$lib/Node.js';
	import ConnectorItemContent from './ConnectorItemContent.svelte';

	interface Props {
		node: Node;
	}

	const { node }: Props = $props();
</script>

{#snippet connectorContent()}
	<ConnectorItemContent />
{/snippet}

<div class="node-item-content">
	<div>
		{node.id}
	</div>
	<div>some options not related to the core node structure</div>
	<ConnectorItem content={connectorContent} />
</div>

<style>
	.node-item-content {
		color: white;
		background-color: gray;
		max-width: 200px;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}
</style>
