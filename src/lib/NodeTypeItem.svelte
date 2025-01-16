<script lang="ts">
	import { getContainerContext } from './containerContext.js';
	import type { NodeType } from './NodeType.js';
	import type { Space } from './space/Space.js';
	import { getDataPointerPosition } from './utils/getDataPointerPosition.js';

	interface Props {
		space: Space;
		nodeType: NodeType;
		closeModal: () => void;
	}

	const { space, nodeType, closeModal }: Props = $props();

	const containerWrapper = getContainerContext();

	function handleClick(e: MouseEvent) {
		if (!containerWrapper.container) return;
		closeModal();

		const dataPosition = getDataPointerPosition(e, space, containerWrapper.container);

		// TODO
	}
</script>

<button onclick={handleClick} class="common-button">
	{nodeType.name}
</button>
