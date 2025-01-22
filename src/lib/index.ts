import type { Connection } from './connection/Connection.js';
import type { Connector } from './connector/Connector.js';
import type { EndPreviewConnectionEvent } from './node/events/EndPreviewConnectionEvent.js';
import type { MoveEvent } from './node/events/MoveEvent.js';
import type { Node } from './node/Node.js';
import { getNodeListContext, setNodeListContext } from './node/nodeListContext.js';
import { Vector } from './space/Vector.js';
import { getElementPosition } from './ui/getElementPosition.js';
import { getMouseRelativePosition } from './ui/getMouseRelativePosition.js';
import { getLinePathD } from './wire/getLinePath.js';
import { getVectorsString } from './wire/getVectorsString.js';
import { getVectorString } from './wire/getVectorString.js';

// Yes, they look broken
import ConnectionItem from './connection/ConnectionItem.svelte';
import PreviewConnectionWire from './connection/PreviewConnectionWire.svelte';
import ConnectorArea from './connector/ConnectorArea.svelte';
import ConnectorItem from './connector/ConnectorItem.svelte';
import Mover from './node/Mover.svelte';
import NodeItem from './node/NodeItem.svelte';
import NodeList from './node/NodeList.svelte';
import WirePath from './wire/WirePath.svelte';
import WireSvg from './wire/WireSvg.svelte';

export {
	ConnectionItem,
	ConnectorArea,
	ConnectorItem,
	getElementPosition,
	getLinePathD,
	getMouseRelativePosition,
	getNodeListContext,
	getVectorsString,
	getVectorString,
	Mover,
	NodeItem,
	NodeList,
	PreviewConnectionWire,
	setNodeListContext,
	Vector,
	WirePath,
	WireSvg,
};

export type { Connection, Connector, EndPreviewConnectionEvent, MoveEvent, Node };
