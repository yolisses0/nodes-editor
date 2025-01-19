import { Vector } from '../space/Vector.js';

export function getElementCenter(element: Element): Vector {
	const rect = element.getBoundingClientRect();
	return new Vector((rect.left + rect.right) / 2, (rect.top + rect.bottom) / 2);
}
