import type { Vector } from '$lib/space/Vector.js';

export type EndPreviewConnectionEvent = {
	mousePosition: Vector;
	endConnectorId?: string;
	startConnectorId: string;
};
