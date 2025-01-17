<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import type { PreviewConnection } from '../input/PreviewConnection.js';
	import type { Output } from './Output.svelte.js';

	interface Props {
		space: Space;
		output: Output;
	}
	let { space, output }: Props = $props();

	function handlePreviewEnd(previewConnection: PreviewConnection) {
		const { endConnector } = previewConnection;

		// TODO add callback
	}
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative flex flex-col">
	<ConnectorItem
		onPreviewEnd={handlePreviewEnd}
		{space}
		connector={output}
		class="flex-row-reverse"
	/>
</div>
