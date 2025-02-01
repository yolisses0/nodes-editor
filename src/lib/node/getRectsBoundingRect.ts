import type { Rect } from './Rect.js';

export function getRectsBoundingRect(rects: Rect[]): Rect {
	if (rects.length === 0) {
		throw new Error('No rects provided');
	}

	let minPosition = rects[0].position;
	let maxPosition = rects[0].position.add(rects[0].size);

	rects.forEach((rect) => {
		minPosition = minPosition.min(rect.position);
		maxPosition = maxPosition.max(rect.position.add(rect.size));
	});

	return {
		position: minPosition,
		size: maxPosition.subtract(minPosition),
	};
}
