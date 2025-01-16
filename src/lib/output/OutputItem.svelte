<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte';
	import type { Space } from '$lib/space/Space';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import { Input } from '../input/Input.svelte';
	import type { PreviewConnection } from '../input/PreviewConnection';
	import type { Output } from './Output.svelte';

	interface Props {
		space: Space;
		output: Output;
		editor: Editor;
	}
	let { space, output, editor }: Props = $props();

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
