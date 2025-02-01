import { Vector } from '$lib/space/Vector.js';
import { expect, test } from 'vitest';
import type { Rect } from './Rect.js';
import { getRectsBoundingRect } from './getRectsBoundingRect.js';

test('getRectsBoundingRect empty', () => {
	const rects: Rect[] = [];

	expect(() => {
		getRectsBoundingRect(rects);
	}).toThrow();
});

test('getRectsBoundingRect one rect', () => {
	const rects: Rect[] = [
		{
			position: new Vector(1, 2),
			size: new Vector(3, 4),
		},
	];

	const boundingRect = getRectsBoundingRect(rects);

	expect(boundingRect).toEqual({
		position: new Vector(1, 2),
		size: new Vector(3, 4),
	});
});

test('getRectsBoundingRect multiple rects', () => {
	// min x = -9
	// max x = 11
	// min y = -10
	// max y = 14
	const rects: Rect[] = [
		{
			position: new Vector(1, 2),
			size: new Vector(10, 4),
		},
		{
			position: new Vector(5, 6),
			size: new Vector(2, 8),
		},
		{
			position: new Vector(-9, -10),
			size: new Vector(1, 2),
		},
	];

	const boundingRect = getRectsBoundingRect(rects);

	expect(boundingRect).toEqual({
		position: new Vector(-9, -10),
		size: new Vector(20, 24),
	});
});
