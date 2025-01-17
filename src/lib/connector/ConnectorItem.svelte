<script lang="ts">
	import type { Space } from '$lib/space/Space.js';
	import { getDataPointerPosition } from '$lib/utils/getDataPointerPosition.js';
	import JointCircle from '../connector/JointCircle.svelte';
	import { getContainerContext } from '../containerContext.js';
	import { getElementPosition } from '../getElementPosition.js';
	import { getPointerPosition } from '../getPointerPosition.js';
	import type { PreviewConnection } from '../input/PreviewConnection.js';
	import { getPreviewConnectionContext } from '../input/previewConnectionContext.js';
	import type { Connector } from './Connector.js';

	// TODO create a callback to `shouldPreviewConnect`
	interface Props {
		space: Space;
		class?: string;
		connector: Connector;
		onPreviewEnd: (previewConnection: PreviewConnection) => void;
	}
	let { space, connector, onPreviewEnd, class: className }: Props = $props();

	let containerWrapper = getContainerContext();

	let previewConnectionWrapper = getPreviewConnectionContext();

	function handlePointerDown(e: PointerEvent) {
		e.stopPropagation();

		if (e.pointerType !== 'mouse' || e.button === 1) return;
		if (!containerWrapper.container) return;

		const containerPosition = getElementPosition(containerWrapper.container);
		const screenPosition = getPointerPosition(e).subtract(containerPosition);
		const dataPosition = space.getDataPosition(screenPosition);

		previewConnectionWrapper.previewConnection = {
			startConnector: connector,
			dataPointerPosition: dataPosition
		};

		containerWrapper.container.addEventListener('pointermove', handleContainerPointerMove as any);
		containerWrapper.container.addEventListener('pointerup', handleContainerPointerUp as any);
	}

	function handleContainerPointerMove(e: PointerEvent) {
		e.stopPropagation();

		if (!containerWrapper.container) return;

		const dataPointerPosition = getDataPointerPosition(e, space, containerWrapper.container);
		if (previewConnectionWrapper.previewConnection) {
			previewConnectionWrapper.previewConnection.dataPointerPosition = dataPointerPosition;
		}
	}

	function handleContainerPointerUp(e: PointerEvent) {
		e.stopPropagation();

		if (previewConnectionWrapper.previewConnection) {
			onPreviewEnd(previewConnectionWrapper.previewConnection);
			previewConnectionWrapper.previewConnection = undefined;
		}

		if (containerWrapper.container) {
			containerWrapper.container.removeEventListener(
				'pointermove',
				handleContainerPointerMove as any
			);
			containerWrapper.container.removeEventListener('pointerup', handleContainerPointerUp as any);
		}
	}

	function handlePointerEnter(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector } = previewConnectionWrapper.previewConnection;

		previewConnectionWrapper.previewConnection.endConnector = connector;
	}

	function handlePointerOut(e: PointerEvent) {
		if (!previewConnectionWrapper.previewConnection) return;

		const { startConnector, endConnector } = previewConnectionWrapper.previewConnection;

		// TODO add condition callback
		previewConnectionWrapper.previewConnection.endConnector = undefined;
	}
</script>

<button
	onpointerout={handlePointerOut}
	onpointerdown={handlePointerDown}
	onpointerenter={handlePointerEnter}
	class="hover-bg w-full"
>
	<!-- TODO consider using some other approach to prevent
 children events of pointer out. E.g.: replace pointer events
 by mouse events  -->
	<div class="pointer-events-none flex w-full flex-row items-center whitespace-nowrap {className}">
		<JointCircle />
		<div class="flex flex-col">{connector.name}</div>
	</div>
</button>
