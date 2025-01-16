<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import { Input } from '../input/Input.svelte.js';
	import type { PreviewConnection } from '../input/PreviewConnection.js';
	import type { Output } from './Output.svelte.js';

	interface Props {
		space: Space;
		output: Output;
	}
	let { space, output }: Props = $props();

	function handlePreviewEnd(previewConnection: PreviewConnection) {
		const { endConnector } = previewConnection;

		if (endConnector instanceof Input && endConnector.connectedOutput !== output) {
			// TODO
		}
	}
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative">
	<ConnectorItem
		onPreviewEnd={handlePreviewEnd}
		{space}
		connector={output}
		targetClass={Input}
		class="flex-row-reverse"
	/>
</div>
