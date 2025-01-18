import type { MoveObserverCallback } from './MoveObserverCallback.js';
import type { MoveObserverInit } from './MoveObserverInit.js';

export class MoveObserver {
	observationTargets: Element[] = [];

	constructor(
		public callback: MoveObserverCallback,
		public options: MoveObserverInit,
	) {}

	observe(target: Element) {
		const overlay = document.createElement('div');
		overlay.style.position = 'absolute';

		const rootRect = this.options.root.getBoundingClientRect();
		const targetRect = target.getBoundingClientRect();

		overlay.style.background = '#f008';
		overlay.style.pointerEvents = 'none';
		overlay.style.width = targetRect.width + 'px';
		overlay.style.height = targetRect.height + 'px';
		overlay.style.top = targetRect.top - rootRect.top + 'px';
		overlay.style.left = targetRect.left - rootRect.left + 'px';

		this.options.root.appendChild(overlay);

		const intersectionObserver = new IntersectionObserver(
			(entries) => {
				console.log(entries);
			},
			{ root: target },
		);
		intersectionObserver.observe(overlay);
	}

	unobserve(target: Element) {}

	disconnect() {
		this.observationTargets = [];
	}
}
