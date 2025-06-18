<script lang="ts">
	import { getPreviewConnectionContext, setDefaultContexts, Vector } from '$lib/index.js';
	import AddOffsetButton from './AddOffsetButton.svelte';
	import CustomNodeList from './CustomNodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';
	import { setOffsetContext } from './offsetContext.js';

	setDefaultContexts();

	const offsetContext = $state({ offset: Vector.zero() });
	setOffsetContext(offsetContext);
	let element = $state<HTMLElement>();

	const previewConnectionContext = getPreviewConnectionContext();
</script>

<div>This is a height limited scroll. It's intentional.</div>
<div>
	Text {previewConnectionContext.startConnectorId}
	{previewConnectionContext.endConnectorId}
</div>
<AddOffsetButton {element} />
<div class="container1">
	<div class="container2" bind:this={element}>
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
