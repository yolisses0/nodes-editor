import { getMouseContext } from '$lib/mouse/mouseContext.js';
import type { EndPreviewConnectionEvent } from '$lib/node/events/EndPreviewConnectionEvent.js';
import { getRectContainsPoint } from '$lib/node/getRectContainsPoint.js';
import { getNodeListContext } from '$lib/node/nodeListContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import { getPreviewConnectionContext } from './previewConnectionContext.js';

export class PreviewConnectionPointerStrategy implements PointerStrategy {
	isOutside = false;
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	previewConnectionContext = getPreviewConnectionContext();

	constructor(public onEndPreview: (e: EndPreviewConnectionEvent) => void) {}

	endPreview() {
		const { startConnectorId, endConnectorId } = this.previewConnectionContext;
		if (!startConnectorId) return;

		if (this.onEndPreview) {
			this.onEndPreview({
				endConnectorId: endConnectorId,
				startConnectorId: startConnectorId,
				mousePosition: this.mouseContext.mouseRelativePosition,
			});
		}

		this.previewConnectionContext.endConnectorId = undefined;
		this.previewConnectionContext.startConnectorId = undefined;
	}

	onpointerdown = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		this.isOutside = false;

		// Prevents connection from starting with the previous mouse position
		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
		this.mouseContext.mouseRelativePosition = mouseRelativePosition;
	};

	onpointermove = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
		this.mouseContext.mouseRelativePosition = mouseRelativePosition;

		// For performance reasons the values are updated in every mouse
		// movement. Remove this optimization if needed
		if (this.previewConnectionContext.startConnectorId) {
			// If isOutside, but still fires onpointermove, check if the cursor
			// entered the node list area. If it does, change isOutside and release
			// the pointer capture
			if (this.isOutside) {
				const rect = nodeList.getBoundingClientRect();
				if (getRectContainsPoint(rect, mouseRelativePosition)) {
					this.isOutside = false;
					nodeList.releasePointerCapture(e.pointerId);
				}
			}
		}
	};

	onpointerup = (e: PointerEvent) => {
		this.nodeListContext.nodeList?.releasePointerCapture(e.pointerId);
		this.endPreview();
		this.isOutside = false;
	};

	onpointerleave = (e: PointerEvent) => {
		this.isOutside = true;
		this.nodeListContext.nodeList?.setPointerCapture(e.pointerId);
	};

	oncontextmenu = () => {
		this.endPreview();
		this.isOutside = false;
	};
}
