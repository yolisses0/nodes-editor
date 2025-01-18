export class Vector {
	constructor(
		public x: number,
		public y: number,
	) {
		Object.freeze(this);
	}

	absolute() {
		return new Vector(Math.abs(this.x), Math.abs(this.y));
	}

	/**
	 * Returns a vector with the minimum x and y of the two vectors
	 */
	min(vector: Vector) {
		return new Vector(this.x < vector.x ? this.x : vector.x, this.y < vector.y ? this.y : vector.y);
	}

	subtract(vector: Vector) {
		return new Vector(this.x - vector.x, this.y - vector.y);
	}
}
