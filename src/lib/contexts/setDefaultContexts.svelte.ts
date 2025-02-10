import {
	type PreviewConnectionContext,
	setPreviewConnectionContext,
} from '$lib/connection/previewConnectionContext.js';
import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
import { type MouseContext, setMouseContext } from '$lib/mouse/mouseContext.js';
import { type NodeRectsContext, setNodeRectsContext } from '$lib/node/nodeRectsContext.js';
import { type RootElementContext, setRootElementContext } from '$lib/node/rootElementContext.js';
import {
	type SelectedNodeIdsContext,
	setSelectedNodeIdsContext,
} from '$lib/selection/selectedNodeIdsContext.js';
import {
	type SelectionBoxContext,
	setSelectionBoxContext,
} from '$lib/selection/selectionBoxContext.js';
import { Vector } from '$lib/space/Vector.js';
import { SvelteSet } from 'svelte/reactivity';

export function setDefaultContexts() {
	const connectorPositions: ConnectorPositions = $state({});
	const selectionBoxContext: SelectionBoxContext = $state({});
	const previewConnection: PreviewConnectionContext = $state({});
	const nodeRectsContext: NodeRectsContext = $state({ nodeRects: {} });
	const rootElementContext: RootElementContext = $state({});
	const mouseContext: MouseContext = $state({ mouseRelativePosition: new Vector(0, 0) });
	const selectedNodeIdsContext: SelectedNodeIdsContext = $state({
		selectedNodeIds: new SvelteSet(),
	});

	setMouseContext(mouseContext);
	setNodeRectsContext(nodeRectsContext);
	setRootElementContext(rootElementContext);
	setSelectionBoxContext(selectionBoxContext);
	setPreviewConnectionContext(previewConnection);
	setConnectorPositionsContext(connectorPositions);
	setSelectedNodeIdsContext(selectedNodeIdsContext);
}
