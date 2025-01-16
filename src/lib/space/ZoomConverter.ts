import type { Converter } from './Converter.js';
import { Vector } from './Vector.js';

export class ZoomConverter implements Converter {
	constructor(private zoom: number) {}

	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition.multiply(Vector.fromNumber(this.zoom));
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.divide(Vector.fromNumber(this.zoom));
	}
}
