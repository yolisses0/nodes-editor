<script lang="ts">
	import {
		setPreviewConnectionContext,
		type PreviewConnectionContext,
	} from '$lib/connection/previewConnectionContext.js';
	import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
	import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
	import { Vector } from '$lib/space/Vector.js';
	import { getMousePosition } from '$lib/ui/getMousePosition.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { EndPreviewConnectionEvent } from './events/EndPreviewConnectionEvent.js';
	import { getRectContainsPoint } from './getRectContainsPoint.js';
	import { setNodeListContext, type NodeListContext } from './nodeListContext.js';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		onEndPreview?: (e: EndPreviewConnectionEvent) => void;
	}
	const props: Props = $props();
	const { children, onEndPreview } = props;

	const connectorPositions: ConnectorPositions = $state({});
	setConnectorPositionsContext(connectorPositions);

	const nodeListContext: NodeListContext = $state({ nodeList: undefined });
	setNodeListContext(nodeListContext);

	const previewConnection: PreviewConnectionContext = $state({
		mousePosition: new Vector(0, 0),
	});
	setPreviewConnectionContext(previewConnection);

	function endPreview() {
		if (!previewConnection.startConnector) return;

		if (onEndPreview) {
			onEndPreview({
				endConnector: previewConnection.endConnector,
				mousePosition: previewConnection.mousePosition,
				startConnector: previewConnection.startConnector,
			});
		}

		previewConnection.startConnector = undefined;
		isOutside = false;
	}

	function handlePointerMove(e: PointerEvent) {
		// For performance reasons the values are updated in every mouse
		// movement. Remove this optimization if needed
		if (!previewConnection.startConnector) return;

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
		if (!nodeListContext.nodeList) return;

		isOutside = false;

		// Prevents connection from starting with the previous mouse position
		previewConnection.mousePosition = getMousePosition(e, nodeListContext.nodeList);
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	class:node-list={true}
	onpointerup={handlePointerUp}
	onpointerdown={handlePointerDown}
	oncontextmenu={handleContextMenu}
	onpointermove={handlePointerMove}
	onpointerleave={handlePointerLeave}
	bind:this={nodeListContext.nodeList}
	{...props}
>
	{@render children()}
</div>

<style>
	.node-list {
		flex: 1;
		display: flex;
		overflow: hidden;
		position: relative;
	}
</style>
