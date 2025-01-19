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

	function endPreview() {
		previewConnection.startConnectorId = undefined;
		isOutside = false;
	}

	function getRectContainsPoint(rect: DOMRect, point: Vector) {
		return (
			rect.top <= point.y && point.y <= rect.bottom && rect.left <= point.x && point.x <= rect.right
		);
	}

	function handlePointerMove(e: PointerEvent) {
		if (!nodeListContext.nodeList) return;

		const rect = nodeListContext.nodeList.getBoundingClientRect();
		const mousePosition = new Vector(e.clientX, e.clientY).subtract(
			new Vector(rect.left, rect.top),
		);
		previewConnection.mousePosition = mousePosition;

		// If isOutside, but still fires onpointermove, check if the cursor
		// entered the node list area. If it does, change isOutside and release
		// the pointer capture
		if (isOutside) {
			if (getRectContainsPoint(rect, mousePosition)) {
				isOutside = false;
				nodeListContext.nodeList.releasePointerCapture(e.pointerId);
			}
		}
	}

	function handlePointerUp(e: PointerEvent) {
		nodeListContext.nodeList?.releasePointerCapture(e.pointerId);
		endPreview();
	}

	function handlePointerDown(e: PointerEvent) {
		isOutside = false;
	}

	let isOutside = $state(true);

	function handlePointerLeave(e: PointerEvent) {
		isOutside = true;
		nodeListContext.nodeList?.setPointerCapture(e.pointerId);
	}

	function handleContextMenu() {
		endPreview();
	}
</script>

{isOutside}

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class="node-list"
	onpointerup={handlePointerUp}
	onpointerdown={handlePointerDown}
	oncontextmenu={handleContextMenu}
	onpointermove={handlePointerMove}
	onpointerleave={handlePointerLeave}
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
