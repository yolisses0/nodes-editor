import {
	type PreviewConnectionContext,
	setPreviewConnectionContext,
} from '$lib/connection/previewConnectionContext.js';
import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
import { type MouseContext, setMouseContext } from '$lib/mouse/mouseContext.js';
import { type NodeListContext, setNodeListContext } from '$lib/node/nodeListContext.js';
import { type NodeRectsContext, setNodeRectsContext } from '$lib/node/nodeRectsContext.js';
import {
	type SelectedNodesContext,
	setSelectedNodesContext,
} from '$lib/node/selectedNodesContext.js';
import { type SelectionContext, setSelectionContext } from '$lib/selection/selectionContext.js';
import { Vector } from '$lib/space/Vector.js';

export function setDefaultContexts() {
	const selectionContext: SelectionContext = $state({});
	const connectorPositions: ConnectorPositions = $state({});
	const previewConnection: PreviewConnectionContext = $state({});
	const nodeRectsContext: NodeRectsContext = $state({ nodeRects: {} });
	const nodeListContext: NodeListContext = $state({ nodeList: undefined });
	const mouseContext: MouseContext = $state({ mouseRelativePosition: new Vector(0, 0) });
	const selectedNodesContext: SelectedNodesContext = $state({ selectedNodes: { devNode2: true } });

	setMouseContext(mouseContext);
	setNodeListContext(nodeListContext);
	setNodeRectsContext(nodeRectsContext);
	setSelectionContext(selectionContext);
	setSelectedNodesContext(selectedNodesContext);
	setPreviewConnectionContext(previewConnection);
	setConnectorPositionsContext(connectorPositions);
}
