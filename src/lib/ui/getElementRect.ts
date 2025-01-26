import type { Rect } from '$lib/node/Rect.js';
import { Vector } from '$lib/space/Vector.js';

export function getElementRect(element: Element): Rect {
	const domRect = element.getBoundingClientRect();
	return {
		size: new Vector(domRect.width, domRect.height),
		position: new Vector(domRect.left, domRect.top),
	};
}
