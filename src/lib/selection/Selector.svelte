<script lang="ts">
	import type { Snippet } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';
	import { getSelectedNodeIdsContext } from './selectedNodeIdsContext.js';

	interface Props {
		id: string;
		children: Snippet;
	}

	const { id, children }: Props = $props();
	const selectedNodeIdsContext = getSelectedNodeIdsContext();

	function handlePointerDown(e: MouseEvent) {
		const { selectedNodeIds } = selectedNodeIdsContext;
		if (e.shiftKey) {
			if (selectedNodeIds.has(id)) {
				selectedNodeIds.delete(id);
			} else {
				selectedNodeIds.add(id);
			}
		} else if (!selectedNodeIds.has(id)) {
			selectedNodeIdsContext.selectedNodeIds = new SvelteSet([id]);
		}
	}
</script>

<div onpointerdown={handlePointerDown}>
	{@render children?.()}
</div>
