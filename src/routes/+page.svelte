<script lang="ts">
	import type { Node } from '$lib/Node.js';
	import NodeList from '$lib/NodeList.svelte';
	import { devNodes } from './devNodes.js';
	import NodeItemContent from './NodeItemContent.svelte';
</script>

{#snippet content({ node }: { node: Node })}
	<NodeItemContent {node} />
{/snippet}

<NodeList nodes={devNodes} {content} />
