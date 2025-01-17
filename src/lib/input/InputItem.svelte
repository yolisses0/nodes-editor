<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import ConnectorItem from '../connector/ConnectorItem.svelte';
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

		// TODO
	}
</script>

{#if input.connectedOutput}
	<InputItemWire {input} {space} output={input.connectedOutput} />
{/if}
<ConnectorItem onPreviewEnd={handlePreviewEnd} {space} connector={input} />
