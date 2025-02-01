<script lang="ts">
	import { setDefaultContexts } from '$lib/contexts/setDefaultContexts.svelte.js';
	import CustomNodeList from './CustomNodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';

	setDefaultContexts();
</script>

<div class="container1">
	<div class="container2">
		<CustomNodeList customNodes={devNodes} connections={devConnections} />
	</div>
</div>

<style>
	:global(html) {
		color: white;
		background-color: black;
	}

	.container1 {
		display: flex;
		overflow: hidden;
		max-height: 80dvh;
	}

	.container2 {
		display: flex;
		overflow: auto;
	}
</style>
