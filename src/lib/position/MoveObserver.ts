import type { MoveObserverCallback } from './MoveObserverCallback.js';
import type { MoveObserverInit } from './MoveObserverInit.js';

export class MoveObserver {
	root: Element;
	intersectionObserver?: IntersectionObserver;

	constructor(
		public callback: MoveObserverCallback,
		public options: MoveObserverInit,
	) {
		this.root = options.root;
	}

	getRootMargin(target: Element, root: Element) {
		const contentRect = target.getBoundingClientRect();
		const containerRect = root.getBoundingClientRect();

		let topMargin = 1 + containerRect.top - contentRect.top;
		let leftMargin = 1 + containerRect.left - contentRect.left;
		let rightMargin = 1 + contentRect.right - containerRect.right;
		let bottomMargin = 1 + contentRect.bottom - containerRect.bottom;

		if (!Number.isInteger(topMargin)) {
			topMargin++;
		}
		if (!Number.isInteger(leftMargin)) {
			leftMargin++;
		}
		if (!Number.isInteger(rightMargin)) {
			rightMargin++;
		}
		if (!Number.isInteger(bottomMargin)) {
			bottomMargin++;
		}

		/* top | right | bottom | left */
		const rootMargin = [topMargin, rightMargin, bottomMargin, leftMargin].join('px ') + 'px';
		return rootMargin;
	}

	createIntersectionObserver(target: Element, root: Element) {
		return new IntersectionObserver(
			(entries, observer) => {
				const [entry] = entries;

				if (!entry.isIntersecting) {
					observer.disconnect();
					this.intersectionObserver = this.createIntersectionObserver(target, root);
					this.intersectionObserver.observe(target);
				}

				console.log('update');
				if (entry.isIntersecting) {
					this.callback([], this);
				}
			},
			{
				root: root,
				threshold: 1,
				rootMargin: this.getRootMargin(target, root),
			},
		);
	}

	observe(target: Element) {
		if (this.intersectionObserver) {
			throw new Error('Observe is still not implemented for multiple targets');
		}

		this.intersectionObserver = this.createIntersectionObserver(target, this.root);
		this.intersectionObserver.observe(target);
	}

	unobserve(target: Element) {
		throw new Error('Not implemented');
	}

	disconnect() {
		this.intersectionObserver?.disconnect();
	}
}
