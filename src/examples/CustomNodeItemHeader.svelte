<script lang="ts">
	import { Mover, Selector, Vector, type MoveEvent } from '$lib/index.js';
	import type { CustomNode } from './CustomNode.svelte.js';
	import JointCircle from './JointCircle.svelte';

	interface Props {
		node: CustomNode;
	}

	const { node }: Props = $props();
	// This initial value should not matter
	let initialNodePosition = $state(Vector.zero());

	function onStartMove() {
		initialNodePosition = node.position;
	}

	function onMove({ mouseRelativePosition, initialMouseRelativePosition }: MoveEvent) {
		node.position = initialNodePosition
			.add(mouseRelativePosition)
			.subtract(initialMouseRelativePosition);
	}
</script>

<Mover {onMove} {onStartMove}>
	<Selector id={node.id}>
		<div>
			{node.id}
			<JointCircle />
		</div>
	</Selector>
</Mover>
