<script lang="ts">
	import { setDefaultContexts } from '$lib/contexts/setDefaultContexts.svelte.js';
	import CustomNodeList from './CustomNodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';

	setDefaultContexts();
</script>

<div class="container">
	<CustomNodeList customNodes={devNodes} connections={devConnections} />
</div>

<style>
	:global(html) {
		color: white;
		background-color: black;
	}

	.container {
		height: 500px;
		display: flex;
		flex-direction: column;
	}
</style>
