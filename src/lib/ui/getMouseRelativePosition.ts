import { getClientPosition } from './getClientPosition.js';
import { getElementPosition } from './getElementPosition.js';

export function getMouseRelativePosition(e: MouseEvent, rootElement: Element) {
	return getClientPosition(e).subtract(getElementPosition(rootElement));
}
