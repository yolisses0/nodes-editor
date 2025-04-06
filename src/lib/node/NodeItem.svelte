<script lang="ts">
	import type { Vector } from '$lib/space/Vector.js';
	import { getElementPosition } from '$lib/ui/getElementPosition.js';
	import { getElementRect } from '$lib/ui/getElementRect.js';
	import { RectObserver } from 'rect-observer';
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import { getNodeRectsContext } from './nodeRectsContext.js';
	import { getRootElementContext } from './rootElementContext.js';

	interface Props {
		node: Node;
		position: Vector;
		children: Snippet;
	}

	let element: Element;
	const nodeRectsContext = getNodeRectsContext();
	const rootElementContext = getRootElementContext();
	const { node, children, position }: Props = $props();

	function createObserver(rootElement: Element, element: Element) {
		const rectObserverCallback = () => {
			if (!rootElementContext.rootElement) return;
			const rootPosition = getElementPosition(rootElementContext.rootElement);
			const rect = getElementRect(element);
			rect.position = rect.position.subtract(rootPosition);
			nodeRectsContext.nodeRects[node.id] = rect;
		};
		const observer = new RectObserver(rectObserverCallback, { root: rootElement });
		observer.observe(element);
		return observer;
	}

	$effect(() => {
		if (rootElementContext.rootElement) {
			const observer = createObserver(rootElementContext.rootElement, element);
			return () => {
				observer.disconnect();
				delete nodeRectsContext.nodeRects[node.id];
			};
		}
	});
</script>

<div
	class="node-item"
	bind:this={element}
	style:top={position.y + 'px'}
	style:left={position.x + 'px'}
>
	{@render children()}
</div>

<style>
	.node-item {
		position: absolute;
		width: fit-content;
	}
</style>
