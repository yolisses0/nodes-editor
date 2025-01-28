import type { Rect } from '$lib/node/Rect.js';
import type { Vector } from '$lib/space/Vector.js';

export function getRectFromPositions(startPosition: Vector, endPosition: Vector): Rect {
	return {
		position: endPosition.min(startPosition),
		size: endPosition.subtract(startPosition).absolute(),
	};
}
