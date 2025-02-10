import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import { getMouseContext } from '$lib/mouse/mouseContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import { getRootElementContext } from '$lib/node/rootElementContext.js';
import { getMouseRelativePosition } from '$lib/ui/getMouseRelativePosition.js';

import type { ConnectionCondition } from './ConnectionCondition.js';

export class ConnectorAreaPointerStrategy implements PointerStrategy {
	constructor(
		public connectorId: string,
		public connectionCondition?: ConnectionCondition,
	) {}
	mouseContext = getMouseContext();
	nodeListContext = getRootElementContext();
	previewConnectionContext = getPreviewConnectionContext();

	onpointerdown = (e: PointerEvent) => {
		const { rootElement } = this.nodeListContext;
		if (!rootElement) return;

		e.stopPropagation();

		this.previewConnectionContext.startConnectorId = this.connectorId;

		// Prevents connection from starting with the previous mouse position
		const mouseRelativePosition = getMouseRelativePosition(e, rootElement);
		this.mouseContext.mouseRelativePosition = mouseRelativePosition;
	};

	onmouseenter = () => {
		const { startConnectorId } = this.previewConnectionContext;
		if (!startConnectorId) return;

		if (
			this.connectionCondition &&
			!this.connectionCondition({ startConnectorId, endConnectorId: this.connectorId })
		) {
			return;
		}

		this.previewConnectionContext.endConnectorId = this.connectorId;
	};

	onmouseleave = () => {
		if (this.previewConnectionContext.endConnectorId === this.connectorId) {
			this.previewConnectionContext.endConnectorId = undefined;
		}
	};
}
