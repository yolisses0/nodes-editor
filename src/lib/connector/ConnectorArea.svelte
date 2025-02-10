<script lang="ts">
	import PointerEventDispatcher from '$lib/node/PointerEventDispatcher.svelte';
	import type { Snippet } from 'svelte';
	import type { ConnectionCondition } from './ConnectionCondition.js';
	import { ConnectorAreaPointerStrategy } from './ConnectorAreaPointerStrategy.js';

	interface Props {
		children: Snippet;
		connectorId: string;
		connectionCondition?: ConnectionCondition;
	}

	const { children, connectorId, connectionCondition }: Props = $props();
	const connectorAreaPointerStrategy = new ConnectorAreaPointerStrategy(
		connectorId,
		connectionCondition,
	);
</script>

<PointerEventDispatcher pointerStrategy={connectorAreaPointerStrategy}>
	{@render children()}
</PointerEventDispatcher>
