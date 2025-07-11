import type { PointerStrategy } from '$lib/node/PointerStrategy.js';

import type { ConnectionCondition } from '../connection/ConnectionCondition.js';
import type { Connector } from './Connector.js';
import { EndConnectorAreaPointerStrategy } from './EndConnectorAreaPointerStrategy.js';
import { StartConnectorAreaPointerStrategy } from './StartConnectorAreaPointerStrategy.js';

export class ConnectorAreaPointerStrategy<T extends Connector = Connector>
	implements PointerStrategy
{
	endConnectorAreaPointerStrategy: EndConnectorAreaPointerStrategy<T>;
	startConnectorAreaPointerStrategy: StartConnectorAreaPointerStrategy<T>;

	constructor(
		public connector: T,
		public connectionCondition?: ConnectionCondition<T>,
	) {
		this.endConnectorAreaPointerStrategy = new EndConnectorAreaPointerStrategy(
			connector,
			connectionCondition,
		);

		this.startConnectorAreaPointerStrategy = new StartConnectorAreaPointerStrategy(connector);
	}

	onpointerdown = (e: PointerEvent) => {
		this.startConnectorAreaPointerStrategy.onpointerdown(e);
	};

	onmouseenter = () => {
		this.endConnectorAreaPointerStrategy.onmouseenter();
	};

	onmouseleave = () => {
		this.endConnectorAreaPointerStrategy.onmouseleave();
	};
}
