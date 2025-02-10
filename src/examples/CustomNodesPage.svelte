<script lang="ts">
	import { getPreviewConnectionContext, setDefaultContexts } from '$lib/index.js';
	import CustomNodeList from './CustomNodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';

	setDefaultContexts();

	const previewConnectionContext = getPreviewConnectionContext();
</script>

<div>This is a height limited scroll. It's intentional.</div>
<div>
	Text {previewConnectionContext.startConnectorId}
	{previewConnectionContext.endConnectorId}
</div>
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
