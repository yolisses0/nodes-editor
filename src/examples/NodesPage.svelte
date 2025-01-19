<script lang="ts">
	import CustomNodeList from './CustomNodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';
</script>

<div class="container">
	<CustomNodeList customNodes={devNodes} connections={devConnections} />
</div>

<style>
	.container {
		height: 500px;
		display: flex;
		flex-direction: column;
		background-color: black;
	}
</style>
