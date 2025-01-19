import { Vector } from '$lib/space/Vector.js';

export function getElementPosition(element: Element) {
	const rect = element.getBoundingClientRect();
	return new Vector(rect.left, rect.top);
}
