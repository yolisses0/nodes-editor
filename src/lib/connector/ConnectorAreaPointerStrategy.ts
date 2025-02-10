import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';

import type { ConnectionCondition } from './ConnectionCondition.js';

export class ConnectorAreaPointerStrategy implements PointerStrategy {
	constructor(
		public connectorId: string,
		public connectionCondition?: ConnectionCondition,
	) {}
	previewConnectionContext = getPreviewConnectionContext();

	onpointerdown = (e: MouseEvent) => {
		e.stopPropagation();
		this.previewConnectionContext.startConnectorId = this.connectorId;
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
