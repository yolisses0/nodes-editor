<script lang="ts">
	import type { Editor } from '$lib/editor/Editor.svelte.js';
	import type { Space } from '$lib/space/Space.js';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import { Output } from '../output/Output.svelte.js';
	import type { Input } from './Input.svelte.js';
	import InputItemWire from './InputItemWire.svelte';
	import type { PreviewConnection } from './PreviewConnection.js';

	interface Props {
		space: Space;
		input: Input;
		editor: Editor;
	}
	let { space, input, editor }: Props = $props();

	function handlePreviewEnd(previewConnection: PreviewConnection) {
		const { endConnector } = previewConnection;
		if (
			input.connectedOutput !== endConnector &&
			(endConnector instanceof Output || endConnector === undefined)
		) {
			// TODO
		}
	}
</script>

<!-- This div forces the offset to be given by the 
 input position instead of the node position -->
<div class="relative">
	{#if input.connectedOutput}
		<InputItemWire {input} {space} output={input.connectedOutput} />
	{/if}
	<ConnectorItem onPreviewEnd={handlePreviewEnd} {space} connector={input} targetClass={Output} />
</div>
