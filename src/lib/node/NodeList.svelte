<script lang="ts">
	import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
	import { getMouseContext } from '$lib/mouse/mouseContext.js';
	import { getSelectionContext } from '$lib/selection/selectionContext.js';
	import { Vector } from '$lib/space/Vector.js';
	import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';
	import type { EndPreviewConnectionEvent } from './events/EndPreviewConnectionEvent.js';
	import { getRectContainsPoint } from './getRectContainsPoint.js';
	import { getNodeListContext } from './nodeListContext.js';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		children: Snippet;
		onEndPreview?: (e: EndPreviewConnectionEvent) => void;
	}
	const props: Props = $props();
	const { children, onEndPreview } = props;

	const mouseContext = getMouseContext();
	const nodeListContext = getNodeListContext();
	const selectionContext = getSelectionContext();
	const previewConnection = getPreviewConnectionContext();

	function endPreview() {
		if (!previewConnection.startConnector) return;

		if (onEndPreview) {
			onEndPreview({
				endConnector: previewConnection.endConnector,
				startConnector: previewConnection.startConnector,
				mousePosition: mouseContext.mouseRelativePosition,
			});
		}

		previewConnection.startConnector = undefined;
		isOutside = false;
	}

	function handlePointerMove(e: PointerEvent) {
		if (!nodeListContext.nodeList) return;

		const rect = nodeListContext.nodeList.getBoundingClientRect();
		const mousePosition = new Vector(e.clientX, e.clientY).subtract(
			new Vector(rect.left, rect.top),
		);
		mouseContext.mouseRelativePosition = mousePosition;
		selectionContext.endPosition = mouseContext.mouseRelativePosition;

		// For performance reasons the values are updated in every mouse
		// movement. Remove this optimization if needed
		if (previewConnection.startConnector) {
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
	}

	function handlePointerUp(e: PointerEvent) {
		nodeListContext.nodeList?.releasePointerCapture(e.pointerId);
		endPreview();

		selectionContext.endPosition = undefined;
		selectionContext.startPosition = undefined;
	}

	function handlePointerDown(e: PointerEvent) {
		if (!nodeListContext.nodeList) return;

		isOutside = false;

		// Prevents connection from starting with the previous mouse position
		mouseContext.mouseRelativePosition = getMouseRelativePosition(e, nodeListContext.nodeList);
		selectionContext.startPosition = mouseContext.mouseRelativePosition;
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
