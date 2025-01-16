<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import { Vector } from '$lib/space/Vector.js';
	import { devNodeTypes } from './devNodeTypes.js';
	import NodeTypeList from './NodeTypeList.svelte';

	interface Props {
		space: Space;
		closeModal: () => void;
		screenPosition: Vector;
	}

	const { space, editor, closeModal, screenPosition: screenInitialPosition }: Props = $props();
	const screenOffset = new Vector(2, 56);
	const screenPosition = $derived(screenInitialPosition.subtract(screenOffset));
</script>

<div
	style:top={screenPosition.y + 'px'}
	style:left={screenPosition.x + 'px'}
	class="absolute rounded bg-zinc-600"
>
	<div class="p-2">Add Node</div>
	<hr class="opacity-50" />
	<NodeTypeList {space} {editor} nodeTypes={devNodeTypes} {closeModal} />
</div>
