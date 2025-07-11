import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import { getMouseContext } from '$lib/mouse/mouseContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import { getRootElementContext } from '$lib/node/rootElementContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';

import type { Connector } from './Connector.js';

export class StartConnectorAreaPointerStrategy<T extends Connector = Connector>
	implements PointerStrategy
{
	constructor(public connector: T) {}
	mouseContext = getMouseContext();
	rootElementContext = getRootElementContext();
	previewConnectionContext = getPreviewConnectionContext<T>();

	onpointerdown = (e: PointerEvent) => {
		const { rootElement } = this.rootElementContext;
		if (!rootElement) return;

		e.stopPropagation();

		this.previewConnectionContext.startConnector = this.connector;

		// Prevents connection from starting with the previous mouse position
		const mouseRelativePosition = getMouseRelativePosition(e, rootElement);
		this.mouseContext.mouseRelativePosition = mouseRelativePosition;
	};
}
