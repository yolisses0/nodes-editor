<script lang="ts">
	import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';

	interface Props {
		children: Snippet;
		connector: Connector;
	}

	const { children, connector }: Props = $props();

	const previewConnection = getPreviewConnectionContext();

	function handleMouseDown(e: MouseEvent) {
		previewConnection.startConnectorId = connector.id;
	}

	function handleMouseEnter(e: MouseEvent) {
		previewConnection.endConnectorId = connector.id;
	}
</script>

<button onmousedown={handleMouseDown} onmouseenter={handleMouseEnter}>
	{@render children()}
</button>
