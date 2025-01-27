import { getMouseContext } from '$lib/mouse/mouseContext.js';
import { getSelectionContext } from '$lib/selection/selectionContext.js';
import { Vector } from '$lib/space/Vector.js';
import { getNodeListContext } from './nodeListContext.js';
import type { PointerStrategy } from './PointerStrategy.js';

export class SelectionBoxPointerStrategy implements PointerStrategy {
	mouseContext = getMouseContext();
	nodeListContext = getNodeListContext();
	selectionContext = getSelectionContext();

	onpointerup(e: PointerEvent): void {
		this.selectionContext.endPosition = undefined;
		this.selectionContext.startPosition = undefined;
		this.nodeListContext.nodeList?.releasePointerCapture(e.pointerId);
	}

	onpointermove(e: PointerEvent): void {
		console.log(this.nodeListContext);
		this.nodeListContext.nodeList?.setPointerCapture(e.pointerId);
		this.selectionContext.startPosition = this.mouseContext.mouseRelativePosition;
	}

	onpointerdown(e: PointerEvent): void {
		if (!this.nodeListContext.nodeList) return;

		const rect = this.nodeListContext.nodeList.getBoundingClientRect();
		const mousePosition = new Vector(e.clientX, e.clientY).subtract(
			new Vector(rect.left, rect.top),
		);
		this.mouseContext.mouseRelativePosition = mousePosition;
		this.selectionContext.endPosition = this.mouseContext.mouseRelativePosition;
	}
}
