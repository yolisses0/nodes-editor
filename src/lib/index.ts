import type { OffsetContext } from '$examples/offsetContext.js';
import type { Connection } from './connection/Connection.js';
import type { ConnectionCondition } from './connection/ConnectionCondition.js';
import ConnectionItem from './connection/ConnectionItem.svelte';
import {
	getPreviewConnectionContext,
	previewConnectionContextKey,
	setPreviewConnectionContext,
	type PreviewConnectionContext,
} from './connection/previewConnectionContext.js';
import { PreviewConnectionPointerStrategy } from './connection/PreviewConnectionPointerStrategy.js';
import PreviewConnectionWire from './connection/PreviewConnectionWire.svelte';
import { ConnectorAreaPointerStrategy } from './connector/ConnectorAreaPointerStrategy.js';
import ConnectorJoint from './connector/ConnectorJoint.svelte';
import {
	connectorPositionsKey,
	getConnectorPositionsContext,
	setConnectorPositionsContext,
} from './connector/connectorPositionsContext.js';
import { setDefaultContexts } from './contexts/setDefaultContexts.svelte.js';
import {
	getMouseContext,
	mouseContextKey,
	setMouseContext,
	type MouseContext,
} from './mouse/mouseContext.js';
import { EmptyPointerStrategy } from './node/EmptyPointerStrategy.js';
import type { EndPreviewConnectionEvent } from './node/events/EndPreviewConnectionEvent.js';
import type { MoveEvent } from './node/events/MoveEvent.js';
import { getRectsBoundingRect } from './node/getRectsBoundingRect.js';
import { MoverPointerStrategy } from './node/MovePointerStrategy.js';
import type { Node } from './node/Node.js';
import NodeItem from './node/NodeItem.svelte';
import {
	getNodeRectsContext,
	nodeRectsContextKey,
	setNodeRectsContext,
	type NodeRectsContext,
} from './node/nodeRectsContext.js';
import PointerEventDispatcher from './node/PointerEventDispatcher.svelte';
import type { PointerStrategy } from './node/PointerStrategy.js';
import type { Rect } from './node/Rect.js';
import {
	getRootElementContext,
	rootElementContextKey,
	setRootElementContext,
	type RootElementContext,
} from './node/rootElementContext.js';
import {
	getSelectedNodeIdsContext,
	selectedNodeIdsContextKey,
	setSelectedNodeIdsContext,
	type SelectedNodeIdsContext,
} from './selection/selectedNodeIdsContext.js';
import SelectionBox from './selection/SelectionBox.svelte';
import {
	getSelectionBoxContext,
	selectionBoxContextKey,
	setSelectionBoxContext,
	type SelectionBoxContext,
} from './selection/selectionBoxContext.js';
import { SelectionBoxPointerStrategy } from './selection/SelectionBoxPointerStrategy.js';
import { SelectOnClickPointerStrategy } from './selection/SelectOnClickPointerStrategy.js';
import { Vector } from './space/Vector.js';
import { getElementPosition } from './ui/getElementPosition.js';
import { getMouseRelativePosition } from './ui/getMouseRelativePosition.js';
import { getLinePathD } from './wire/getLinePath.js';
import { type GetPathD } from './wire/GetPathD.js';
import { getVectorsString } from './wire/getVectorsString.js';
import { getVectorString } from './wire/getVectorString.js';
import WirePath from './wire/WirePath.svelte';
import WireSvg from './wire/WireSvg.svelte';

export {
	ConnectionItem,
	ConnectorAreaPointerStrategy,
	ConnectorJoint,
	connectorPositionsKey,
	EmptyPointerStrategy,
	getConnectorPositionsContext,
	getElementPosition,
	getLinePathD,
	getMouseContext,
	getMouseRelativePosition,
	getNodeRectsContext,
	getPreviewConnectionContext,
	getRectsBoundingRect,
	getRootElementContext,
	getSelectedNodeIdsContext,
	getSelectionBoxContext,
	getVectorsString,
	getVectorString,
	mouseContextKey,
	MoverPointerStrategy,
	NodeItem,
	nodeRectsContextKey,
	PointerEventDispatcher,
	previewConnectionContextKey,
	PreviewConnectionPointerStrategy,
	PreviewConnectionWire,
	rootElementContextKey,
	selectedNodeIdsContextKey,
	SelectionBox,
	selectionBoxContextKey,
	SelectionBoxPointerStrategy,
	SelectOnClickPointerStrategy,
	setConnectorPositionsContext,
	setDefaultContexts,
	setMouseContext,
	setNodeRectsContext,
	setPreviewConnectionContext,
	setRootElementContext,
	setSelectedNodeIdsContext,
	setSelectionBoxContext,
	Vector,
	WirePath,
	WireSvg,
};

export type {
	Connection,
	ConnectionCondition,
	EndPreviewConnectionEvent,
	GetPathD,
	MouseContext,
	MoveEvent,
	Node,
	NodeRectsContext,
	OffsetContext,
	PointerStrategy,
	PreviewConnectionContext,
	Rect,
	RootElementContext,
	SelectedNodeIdsContext,
	SelectionBoxContext,
};
