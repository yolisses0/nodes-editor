import type { Converter } from './Converter';
import { Vector } from './Vector';

export class ZoomConverter implements Converter {
	constructor(private zoom: number) {}

	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition.multiply(Vector.fromNumber(this.zoom));
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.divide(Vector.fromNumber(this.zoom));
	}
}
