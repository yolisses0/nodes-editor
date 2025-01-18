import type { MoveObserverCallback } from './MoveObserverCallback.js';

export class MoveObserver {
	observationTargets: Element[] = [];

	constructor(public callback: MoveObserverCallback) {}

	observe(target: Element) {}

	unobserve(target: Element) {}

	disconnect() {
		this.observationTargets = [];
	}
}
