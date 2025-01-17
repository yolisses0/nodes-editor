export class Vector {
	constructor(
		public x: number,
		public y: number,
	) {
		Object.freeze(this);
	}
}
