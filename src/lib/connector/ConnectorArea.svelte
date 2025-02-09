<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { Connector } from './Connector.js';
	import { ConnectorAreaPointerStrategy } from './ConnectorAreaPointerStrategy.js';
	import type { EndConnectorCondition } from './EndConnectorCondition.js';

	interface Props {
		children: Snippet;
		connector: Connector;
		endConnectorCondition?: EndConnectorCondition;
	}

	const { children, connector, endConnectorCondition }: Props = $props();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		connector,
		endConnectorCondition,
	);
</script>

<button
	style:display="contents"
	onblur={connectorAreaPointerStrategy.onmouseleave}
	onmousedown={connectorAreaPointerStrategy.onmousedown}
	onmouseenter={connectorAreaPointerStrategy.onmouseenter}
	onmouseleave={connectorAreaPointerStrategy.onmouseleave}
>
	{@render children()}
</button>
