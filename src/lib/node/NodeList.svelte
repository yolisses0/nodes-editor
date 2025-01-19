<script lang="ts">
	import {
		setPreviewConnectionContext,
		type PreviewConnectionContext,
	} from '$lib/connection/previewConnectionContext.js';
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import type { Snippet } from 'svelte';
	import { setNodeListContext, type NodeListContext } from './nodeListContext.js';

	interface Props {
		children: Snippet;
	}
	const { children }: Props = $props();

	const connectorPositions: ConnectorPositions = $state({});
	setConnectorPositionsContext(connectorPositions);

	const nodeListContext: NodeListContext = $state({ nodeList: undefined });
	setNodeListContext(nodeListContext);

	const previewConnection: PreviewConnectionContext = $state({});
	setPreviewConnectionContext(previewConnection);
</script>

<div class="node-list" bind:this={nodeListContext.nodeList}>
	{@render children()}
</div>

<style>
	.node-list {
		position: relative;
	}
</style>
