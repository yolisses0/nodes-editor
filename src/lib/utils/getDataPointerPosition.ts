import { getElementPosition } from '$lib/getElementPosition.js';
import { getPointerPosition } from '$lib/getPointerPosition.js';
import type { Space } from '$lib/space/Space.js';

export function getDataPointerPosition(e: MouseEvent, space: Space, container: Element) {
	const containerPosition = getElementPosition(container);
	const screenPosition = getPointerPosition(e).subtract(containerPosition);
	const dataPosition = space.getDataPosition(screenPosition);
	return dataPosition;
}
