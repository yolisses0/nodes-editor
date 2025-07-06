import { getElementPosition } from './getElementPosition.js';
import { getEventClientPosition } from './getEventClientPosition.js';

export function getMouseRelativePosition(e: MouseEvent, rootElement: Element) {
	return getEventClientPosition(e).subtract(getElementPosition(rootElement));
}
