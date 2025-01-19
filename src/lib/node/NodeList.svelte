<script lang="ts">
	import {
		setPreviewConnectionContext,
		type PreviewConnectionContext,
	} from '$lib/connection/previewConnectionContext.js';
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import { Vector } from '$lib/space/Vector.js';
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

	const previewConnection: PreviewConnectionContext = $state({
		mousePosition: new Vector(0, 0),
	});
	setPreviewConnectionContext(previewConnection);

	function handlePointerMove(e: PointerEvent) {
		previewConnection.mousePosition = new Vector(e.clientX, e.clientY);
	}

	function handlePointerUp() {
		previewConnection.startConnectorId = undefined;
	}

	function handlePointerEnter(e: PointerEvent) {
		nodeListContext.nodeList?.releasePointerCapture(e.pointerId);
	}

	function handlePointerLeave(e: PointerEvent) {
		nodeListContext.nodeList?.setPointerCapture(e.pointerId);
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="node-list"
	onpointerup={handlePointerUp}
	oncontextmenu={handlePointerUp}
	onpointermove={handlePointerMove}
	onpointerleave={handlePointerLeave}
	onpointerenter={handlePointerEnter}
	bind:this={nodeListContext.nodeList}
>
	{@render children()}
</div>

<style>
	.node-list {
		position: relative;
		background-color: brown;
		width: 500px;
		height: 500px;
	}
</style>
