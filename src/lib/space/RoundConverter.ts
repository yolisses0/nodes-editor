import type { Converter } from './Converter.js';
import type { Vector } from './Vector.js';

export class RoundConverter implements Converter {
	getScreenPosition(dataPosition: Vector): Vector {
		return dataPosition;
	}

	getDataPosition(screenPosition: Vector): Vector {
		return screenPosition.round();
	}
}
