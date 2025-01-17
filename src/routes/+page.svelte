<script lang="ts">
	import type { Node } from '$lib/Node.js';
	import NodeList from '$lib/NodeList.svelte';
	import { devNodes } from './devNodes.js';
</script>

{#snippet content({ node }: { node: Node })}
	<div>content {node.id}</div>
{/snippet}

<NodeList nodes={devNodes} {content} />
