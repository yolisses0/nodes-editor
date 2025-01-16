import { Vector } from '$lib/space/Vector.js';

export function getElementScreenSize(element: Element) {
	return new Vector(element.clientWidth, element.clientHeight);
}
