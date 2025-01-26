<script lang="ts">
	import type { Snippet } from 'svelte';
	import { getSelectedNodesContext } from './selectedNodesContext.js';

	interface Props {
		id: string;
		children: Snippet;
	}

	const { id, children }: Props = $props();
	const selectedNodesContext = getSelectedNodesContext();

	function handlePointerUp(e: MouseEvent) {
		if (e.shiftKey) {
			selectedNodesContext.selectedNodes[id] = !selectedNodesContext.selectedNodes[id];
		} else {
			selectedNodesContext.selectedNodes = { [id]: true };
		}
	}
</script>

<div onpointerup={handlePointerUp}>
	{@render children?.()}
</div>
