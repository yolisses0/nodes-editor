import type { MoveObserverCallback } from './MoveObserverCallback.js';
import type { MoveObserverInit } from './MoveObserverInit.js';

export class MoveObserver {
	observationTargets: Element[] = [];

	constructor(
		public callback: MoveObserverCallback,
		public options: MoveObserverInit,
	) {}

	observe(target: Element) {}

	unobserve(target: Element) {}

	disconnect() {
		this.observationTargets = [];
	}
}
