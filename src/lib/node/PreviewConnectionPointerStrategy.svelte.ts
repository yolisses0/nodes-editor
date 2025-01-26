import {
	getPreviewConnectionContext,
	type PreviewConnectionContext,
} from '$lib/connection/previewConnectionContext.js';
import { getMouseContext, type MouseContext } from '$lib/mouse/mouseContext.js';
import { Vector } from '$lib/space/Vector.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';
import type { EndPreviewConnectionEvent } from './events/EndPreviewConnectionEvent.js';
import { getRectContainsPoint } from './getRectContainsPoint.js';
import { getNodeListContext, type NodeListContext } from './nodeListContext.js';
import type { PointerStrategy } from './PointerStrategy.js';

export class PreviewConnectionPointerStrategy implements PointerStrategy {
	isOutside = false;
	public nodeListContext: NodeListContext = getNodeListContext();
	public mouseContext: MouseContext = getMouseContext();
	public previewConnectionContext: PreviewConnectionContext = getPreviewConnectionContext();

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
		if (!this.nodeListContext.nodeList) return;

		this.isOutside = false;

		// Prevents connection from starting with the previous mouse position
		this.mouseContext.mouseRelativePosition = getMouseRelativePosition(
			e,
			this.nodeListContext.nodeList,
		);
	};

	onpointermove = (e: PointerEvent) => {
		if (!this.nodeListContext.nodeList) return;

		const rect = this.nodeListContext.nodeList.getBoundingClientRect();
		const mousePosition = new Vector(e.clientX, e.clientY).subtract(
			new Vector(rect.left, rect.top),
		);
		this.mouseContext.mouseRelativePosition = mousePosition;

		// For performance reasons the values are updated in every mouse
		// movement. Remove this optimization if needed
		if (this.previewConnectionContext.startConnector) {
			// If isOutside, but still fires onpointermove, check if the cursor
			// entered the node list area. If it does, change isOutside and release
			// the pointer capture
			if (this.isOutside) {
				if (getRectContainsPoint(rect, mousePosition)) {
					this.isOutside = false;
					this.nodeListContext.nodeList.releasePointerCapture(e.pointerId);
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
