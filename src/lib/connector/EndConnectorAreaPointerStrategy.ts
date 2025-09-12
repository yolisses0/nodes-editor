import { getPreviewConnectionContext } from '$lib/connection/previewConnectionContext.js';
import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import type { ConnectionCondition } from '../connection/ConnectionCondition.js';
import type { Connector } from './Connector.js';

export class EndConnectorAreaPointerStrategy<T extends Connector = Connector>
	implements PointerStrategy
{
	constructor(
		public connector: T,
		public connectionCondition?: ConnectionCondition<T>,
	) {}
	previewConnectionContext = getPreviewConnectionContext<T>();

	onpointerenter = () => {
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

	onpointerleave = () => {
		if (this.previewConnectionContext.endConnector === this.connector) {
			this.previewConnectionContext.endConnector = undefined;
		}
	};
}
