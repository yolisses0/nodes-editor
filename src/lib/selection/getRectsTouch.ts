import type { Rect } from '$lib/node/Rect.js';

export function getRectsTouch(rect1: Rect, rect2: Rect): boolean {
	const rect1Right = rect1.position.x + rect1.size.x;
	const rect1Bottom = rect1.position.y + rect1.size.y;
	const rect2Right = rect2.position.x + rect2.size.x;
	const rect2Bottom = rect2.position.y + rect2.size.y;

	return (
		rect1.position.x < rect2Right &&
		rect1Right > rect2.position.x &&
		rect1.position.y < rect2Bottom &&
		rect1Bottom > rect2.position.y
	);
}
