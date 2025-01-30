<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSelectedNodeIdsContext } from './selectedNodeIdsContext.js';

	interface Props {
		id: string;
		children: Snippet;
	}

	const { id, children }: Props = $props();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function handlePointerUp(e: MouseEvent) {
		const { selectedNodeIds } = selectedNodeIdsContext;
		if (e.shiftKey) {
			if (selectedNodeIds.has(id)) {
				selectedNodeIds.delete(id);
			} else {
				selectedNodeIds.add(id);
			}
		} else {
			selectedNodeIds.add(id);
		}
	}
</script>

<div onpointerup={handlePointerUp}>
	{@render children?.()}
</div>
