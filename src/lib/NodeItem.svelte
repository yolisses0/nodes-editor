<script lang="ts">
	import type { NodeData } from './NodeData.js';

	interface Props {
		node: NodeData;
	}

	const { node }: Props = $props();
</script>

<div>
	{node.id}
</div>
