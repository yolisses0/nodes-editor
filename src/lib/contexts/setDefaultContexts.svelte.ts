import {
	type PreviewConnectionContext,
	setPreviewConnectionContext,
} from '$lib/connection/previewConnectionContext.js';
import type { ConnectorPositions } from '$lib/connector/ConnectorPositions.js';
import { setConnectorPositionsContext } from '$lib/connector/connectorPositionsContext.js';
import { type MouseContext, setMouseContext } from '$lib/mouse/mouseContext.js';
import { type NodeListContext, setNodeListContext } from '$lib/node/nodeListContext.js';
import { type SelectionContext, setSelectionContext } from '$lib/selection/selectionContext.js';
import { Vector } from '$lib/space/Vector.js';

export function setDefaultContexts() {
	const selectionContext: SelectionContext = $state({});
	setSelectionContext(selectionContext);

	const connectorPositions: ConnectorPositions = $state({});
	setConnectorPositionsContext(connectorPositions);

	const previewConnection: PreviewConnectionContext = $state({});
	setPreviewConnectionContext(previewConnection);

	const nodeListContext: NodeListContext = $state({ nodeList: undefined });
	setNodeListContext(nodeListContext);

	const mouseContext: MouseContext = $state({ mouseRelativePosition: new Vector(0, 0) });
	setMouseContext(mouseContext);
}
