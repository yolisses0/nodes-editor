import type { Vector } from './Vector.js';

export interface Converter {
	getScreenPosition(dataPosition: Vector): Vector;
	getDataPosition(screenPosition: Vector): Vector;
}
