<script lang="ts">
	import type { Node } from '$lib/Node.js';
	import NodeList from '$lib/NodeList.svelte';
	import { Space } from '$lib/space/Space.js';
	import type { Vector } from '$lib/space/Vector.js';
	import { ZoomConverter } from '$lib/space/ZoomConverter.js';
	import { getDevNodes } from './getDevNodes.svelte.js';

	const space = new Space([new ZoomConverter(20)]);
	const nodes = getDevNodes();

	function changeNodePosition(node: Node, position: Vector) {
		node.position = position;
	}
</script>

<NodeList {nodes} {space} {changeNodePosition} />
