import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import type { Connector } from './Connector.js';
import type { EndConnectorCondition } from './EndConnectorCondition.js';

export class ConnectorAreaPointerStrategy implements PointerStrategy {
	constructor(
		public connector: Connector,
		public endConnectorCondition?: EndConnectorCondition,
	) {}
	previewConnectionContext = getPreviewConnectionContext();

	onmousedown = () => {
		this.previewConnectionContext.startConnector = this.connector;
	};

	onmouseenter = () => {
		if (!this.previewConnectionContext.startConnector) return;

		if (
			this.endConnectorCondition &&
			!this.endConnectorCondition(this.connector, this.previewConnectionContext.startConnector)
		) {
			return;
		}

		this.previewConnectionContext.endConnector = this.connector;
	};

	onmouseleave = () => {
		if (this.previewConnectionContext.endConnector?.id === this.connector.id) {
			this.previewConnectionContext.endConnector = undefined;
		}
	};
}
