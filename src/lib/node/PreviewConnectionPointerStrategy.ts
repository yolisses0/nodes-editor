import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import type { EndPreviewConnectionEvent } from './events/EndPreviewConnectionEvent.js';
import { getRectContainsPoint } from './getRectContainsPoint.js';
import { getNodeListContext } from './nodeListContext.js';
import type { PointerStrategy } from './PointerStrategy.js';

export class PreviewConnectionPointerStrategy implements PointerStrategy {
	isOutside = false;
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	previewConnectionContext = getPreviewConnectionContext();

	constructor(public onEndPreview: (e: EndPreviewConnectionEvent) => void) {}

	endPreview() {
		const { startConnector, endConnector } = this.previewConnectionContext;
		if (!startConnector) return;

		if (this.onEndPreview) {
			this.onEndPreview({
				endConnector,
				startConnector,
				mousePosition: this.mouseContext.mouseRelativePosition,
			});
		}

		this.previewConnectionContext.startConnector = undefined;
	}

	onpointerdown = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		this.isOutside = false;

		// Prevents connection from starting with the previous mouse position
		this.mouseContext.mouseRelativePosition = getMouseRelativePosition(e, nodeList);
	};

	onpointermove = (e: PointerEvent) => {
		const { nodeList } = this.nodeListContext;
		if (!nodeList) return;

		const mouseRelativePosition = getMouseRelativePosition(e, nodeList);
		this.mouseContext.mouseRelativePosition = mouseRelativePosition;

		// For performance reasons the values are updated in every mouse
		// movement. Remove this optimization if needed
		if (this.previewConnectionContext.startConnector) {
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
