<script lang="ts">
	import type { NodeData } from './NodeData.js';
	import type { NodeType } from './NodeType.js';
	import type { Space } from './space/Space.js';

	interface Props {
		space: Space;
		nodeType: NodeType;
		closeModal: () => void;
	}

	const { space, editor, nodeType, closeModal }: Props = $props();

	const containerWrapper = getContainerContext();

	function handleClick(e: MouseEvent) {
		if (!containerWrapper.container) return;
		closeModal();

		const dataPosition = getDataPointerPosition(e, space, containerWrapper.container);

		const nodeData: NodeData = {
			extras: {},
			id: createId(),
			position: dataPosition,
			type: nodeType.name + 'Node',
			inputs: nodeType.inputNames.map((inputName) => {
				return { id: createId(), name: inputName };
			}),
			outputs: nodeType.outputNames.map((outputName) => {
				return { id: createId(), name: outputName };
			})
		};

		// TODO
	}

	function getContainerContext() {
		throw new Error('Function not implemented.');
	}

	function getDataPointerPosition(e: MouseEvent, space: Space, container: any) {
		throw new Error('Function not implemented.');
	}

	function createId() {
		throw new Error('Function not implemented.');
	}
</script>

<button onclick={handleClick} class="common-button">
	{nodeType.name}
</button>
