<script lang="ts">
	import type { NodeItemContentProps } from '$lib/NodeItemContentProps.js';
	import NodeList from '$lib/NodeList.svelte';
	import { devNodes } from './devNodes.js';
	import NodeItemContent from './NodeItemContent.svelte';
</script>

{#snippet content({ node, updateConnectorPosition }: NodeItemContentProps)}
	<NodeItemContent {node} {updateConnectorPosition} />
{/snippet}

<NodeList nodes={devNodes} {content} />
