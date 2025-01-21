<script lang="ts">
	import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import type { EndConnectorCondition } from './EndConnectorCondition.js';

	interface Props {
		children: Snippet;
		connector: Connector;
		endConnectorCondition?: EndConnectorCondition;
	}

	const { children, connector, endConnectorCondition }: Props = $props();

	const previewConnection = getPreviewConnectionContext();

	function handleMouseDown() {
		previewConnection.startConnector = connector;
	}

	function handleMouseEnter() {
		if (!previewConnection.startConnector) return;

		if (
			endConnectorCondition &&
			!endConnectorCondition(connector, previewConnection.startConnector)
		) {
			return;
		}

		previewConnection.endConnector = connector;
	}

	function handleMouseLeave() {
		if (previewConnection.endConnector?.id === connector.id) {
			previewConnection.endConnector = undefined;
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
