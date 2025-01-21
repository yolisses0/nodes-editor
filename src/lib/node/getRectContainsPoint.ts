import type { Vector } from '$lib/space/Vector.js';

export function getRectContainsPoint(rect: DOMRect, point: Vector) {
	return (
		rect.top <= point.y && point.y <= rect.bottom && rect.left <= point.x && point.x <= rect.right
	);
}
