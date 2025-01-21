import { Vector } from '$lib/space/Vector.js';
import { getElementPosition } from './getElementPosition.js';

export function getMousePosition(e: MouseEvent, rootElement: Element) {
	return new Vector(e.clientX, e.clientY).subtract(getElementPosition(rootElement));
}
