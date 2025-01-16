import { getElementPosition } from './getElementPosition.js';
import { getPointerPosition } from './getPointerPosition.js';

export function getPointerScreenPosition(e: PointerEvent, element: Element) {
	const pointerPosition = getPointerPosition(e);
	const boundingRectangle = getElementPosition(element);
	return pointerPosition.subtract(boundingRectangle);
}
