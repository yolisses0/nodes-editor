<script lang="ts">
	import { Vector } from '$lib/space/Vector.js';
	import { getElementPosition } from '$lib/ui/getElementPosition.js';
	import { getElementRect } from '$lib/ui/getElementRect.js';
	import { RectObserver } from 'rect-observer';
	import { onMount, type Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import { getNodeRectsContext } from './nodeRectsContext.js';
	import { getRootElementContext } from './rootElementContext.js';

	interface Props {
		node: Node;
		position: Vector;
		children: Snippet;
	}

	let element: HTMLElement;
	let rectObserver: RectObserver;
	const nodeRectsContext = getNodeRectsContext();
	const rootElementContext = getRootElementContext();
	const { node, children, position }: Props = $props();

	const callback = () => {
		console.log('callback');
		if (!element) return;
		const { rootElement } = rootElementContext;
		if (!rootElement) return;

		const elementRect = getElementRect(element);
		const rootPosition = getElementPosition(rootElement);
		elementRect.position = elementRect.position.subtract(rootPosition);
		nodeRectsContext.nodeRects[node.id] = elementRect;
	};

	$effect(() => {
		if (!element) return;
		const { rootElement } = rootElementContext;
		if (!rootElement) return;

		rectObserver = new RectObserver(callback, element, rootElement);
		return () => rectObserver.disconnect();
	});

	onMount(() => {
		return () => {
			rectObserver?.disconnect();
			delete nodeRectsContext.nodeRects[node.id];
		};
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
