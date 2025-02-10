import type { PointerStrategy } from '$lib/node/PointerStrategy.js';
import { SvelteSet } from 'svelte/reactivity';
import { getSelectedNodeIdsContext } from './selectedNodeIdsContext.js';

export class SelectOnClickPointerStrategy implements PointerStrategy {
	selectedNodeIdsContext = getSelectedNodeIdsContext();

	constructor(public nodeId: string) {}

	onpointerdown = (e: MouseEvent) => {
		const { selectedNodeIds } = this.selectedNodeIdsContext;
		if (e.shiftKey) {
			if (selectedNodeIds.has(this.nodeId)) {
				selectedNodeIds.delete(this.nodeId);
			} else {
				selectedNodeIds.add(this.nodeId);
			}
		} else if (!selectedNodeIds.has(this.nodeId)) {
			this.selectedNodeIdsContext.selectedNodeIds = new SvelteSet([this.nodeId]);
		}
	};
}
