import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import { getMouseContext } from '$lib/mouse/mouseContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import { getRootElementContext } from '$lib/node/rootElementContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';

import type { ConnectionCondition } from '../connection/ConnectionCondition.js';
import type { Connector } from './Connector.js';

export class ConnectorAreaPointerStrategy<T extends Connector = Connector>
	implements PointerStrategy
{
	constructor(
		public connector: T,
		public connectionCondition?: ConnectionCondition<T>,
	) {}
	mouseContext = getMouseContext();
	nodeListContext = getRootElementContext();
	previewConnectionContext = getPreviewConnectionContext<T>();

	onpointerdown = (e: PointerEvent) => {
		const { rootElement } = this.nodeListContext;
		if (!rootElement) return;

		e.stopPropagation();

		this.previewConnectionContext.startConnector = this.connector;

		// Prevents connection from starting with the previous mouse position
		const mouseRelativePosition = getMouseRelativePosition(e, rootElement);
		this.mouseContext.mouseRelativePosition = mouseRelativePosition;
	};

	onmouseenter = () => {
		const { startConnector } = this.previewConnectionContext;
		if (!startConnector) return;

		if (
			this.connectionCondition &&
			!this.connectionCondition({ startConnector, endConnector: this.connector })
		) {
			return;
		}

		this.previewConnectionContext.endConnector = this.connector;
	};

	onmouseleave = () => {
		if (this.previewConnectionContext.endConnector === this.connector) {
			this.previewConnectionContext.endConnector = undefined;
		}
	};
}
