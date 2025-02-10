import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';

import type { EndConnectorCondition } from './EndConnectorCondition.js';

export class ConnectorAreaPointerStrategy implements PointerStrategy {
	constructor(
		public connectorId: string,
		public endConnectorCondition?: EndConnectorCondition,
	) {}
	previewConnectionContext = getPreviewConnectionContext();

	onmousedown = (e: MouseEvent) => {
		e.stopPropagation();
		this.previewConnectionContext.startConnectorId = this.connectorId;
	};

	onmouseenter = () => {
		if (!this.previewConnectionContext.startConnectorId) return;

		if (
			this.endConnectorCondition &&
			!this.endConnectorCondition(this.connectorId, this.previewConnectionContext.startConnectorId)
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
