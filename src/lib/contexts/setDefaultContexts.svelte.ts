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
import {
	type SelectionBoxContext,
	setSelectionBoxContext,
} from '$lib/selection/selectionBoxContext.js';
import { Vector } from '$lib/space/Vector.js';

export function setDefaultContexts() {
	const connectorPositions: ConnectorPositions = $state({});
	const selectionBoxContext: SelectionBoxContext = $state({});
	const previewConnection: PreviewConnectionContext = $state({});
	const nodeRectsContext: NodeRectsContext = $state({ nodeRects: {} });
	const nodeListContext: NodeListContext = $state({ nodeList: undefined });
	const mouseContext: MouseContext = $state({ mouseRelativePosition: new Vector(0, 0) });
	const selectedNodesContext: SelectedNodesContext = $state({ selectedNodes: { devNode2: true } });

	setMouseContext(mouseContext);
	setNodeListContext(nodeListContext);
	setNodeRectsContext(nodeRectsContext);
	setSelectionBoxContext(selectionBoxContext);
	setSelectedNodesContext(selectedNodesContext);
	setPreviewConnectionContext(previewConnection);
	setConnectorPositionsContext(connectorPositions);
}
