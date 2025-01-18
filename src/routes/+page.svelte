<script lang="ts">
	import type { NodeItemContentProps } from '$lib/NodeItemContentProps.js';
	import NodeList from '$lib/NodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';
	import NodeItemContent from './NodeItemContent.svelte';
</script>

{#snippet content({ node }: NodeItemContentProps)}
	<NodeItemContent {node} />
{/snippet}

<NodeList {content} nodes={devNodes} connections={devConnections} />
