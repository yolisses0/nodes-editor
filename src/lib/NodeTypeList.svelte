<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import type { NodeType } from './NodeType.js';
	import NodeTypeItem from './NodeTypeItem.svelte';

	interface Props {
		space: Space;
		nodeTypes: NodeType[];
		closeModal: () => void;
	}

	const { space, editor, nodeTypes, closeModal }: Props = $props();
</script>

{#each nodeTypes as nodeType (nodeType.id)}
	<NodeTypeItem {space} {nodeType} {closeModal} />
{/each}
