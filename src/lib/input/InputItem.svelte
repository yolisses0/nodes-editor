<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
	import { Output } from '../output/Output.svelte.js';
	import type { Input } from './Input.js';
	import InputItemWire from './InputItemWire.svelte';
	import type { PreviewConnection } from './PreviewConnection.js';

	interface Props {
		space: Space;
		input: Input;
	}
	let { space, input }: Props = $props();

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
<div class="relative flex flex-col">
	{#if input.connectedOutput}
		<InputItemWire {input} {space} output={input.connectedOutput} />
	{/if}
	<ConnectorItem onPreviewEnd={handlePreviewEnd} {space} connector={input} />
</div>
