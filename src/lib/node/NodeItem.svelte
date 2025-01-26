<script lang="ts">
	import type { Vector } from '$lib/space/Vector.js';
	import { getElementPosition } from '$lib/ui/getElementPosition.js';
	import { getElementRect } from '$lib/ui/getElementRect.js';
	import { RectObserver } from 'rect-observer';
	import type { Snippet } from 'svelte';
	import type { Node } from './Node.js';
	import { getNodeListContext } from './nodeListContext.js';
	import { getNodeRectsContext } from './nodeRectsContext.js';

	interface Props {
		node: Node;
		position: Vector;
		children: Snippet;
	}

	let element: Element;
	const nodeListContext = getNodeListContext();
	const { node, children, position }: Props = $props();
	const nodeRectsContext = getNodeRectsContext();

	function createObserver(nodeList: Element, element: Element) {
		const observer = new RectObserver(
			() => {
				if (!nodeListContext.nodeList) return;
				const rootPosition = getElementPosition(nodeListContext.nodeList);
				const rect = getElementRect(element);
				rect.position = rect.position.subtract(rootPosition);
				nodeRectsContext.nodeRects[node.id] = rect;
			},
			{ root: nodeList },
		);
		observer.observe(element);
		return observer;
	}

	$effect(() => {
		if (nodeListContext.nodeList) {
			const observer = createObserver(nodeListContext.nodeList, element);
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
