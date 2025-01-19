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

	function handleMouseDown() {
		previewConnection.startConnectorId = connector.id;
	}

	function handleMouseEnter() {
		previewConnection.endConnectorId = connector.id;
	}

	function handleMouseLeave() {
		if (previewConnection.endConnectorId === connector.id) {
			previewConnection.endConnectorId = undefined;
		}
	}
</script>

<button
	onblur={handleMouseLeave}
	onmousedown={handleMouseDown}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{@render children()}
</button>
