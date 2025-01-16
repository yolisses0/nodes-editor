<script lang="ts">
	import { devEditorData } from '$lib/editor/dev/devEditorData.js';
	import { Editor } from '$lib/editor/Editor.svelte.js';
	import RedoButton from '$lib/editor/RedoButton.svelte';
	import UndoButton from '$lib/editor/UndoButton.svelte';
	import { OffsetConverter } from '$lib/space/OffsetConverter.js';
	import { Space } from '$lib/space/Space.js';
	import { Vector } from '$lib/space/Vector.js';
	import { ZoomConverter } from '$lib/space/ZoomConverter.js';
	import NodeList from './NodeList.svelte';
	import ZoomInButton from './zoom/ZoomInButton.svelte';
	import ZoomOutButton from './zoom/ZoomOutButton.svelte';

	let zoom = $state(20);

	const editor = new Editor(devEditorData);

	const space = $derived(
		new Space([new OffsetConverter(new Vector(3, 2)), new ZoomConverter(zoom)])
	);
</script>

<div class="flex-row border-b border-b-white/10">
	<UndoButton />
	<RedoButton />
	<ZoomInButton bind:zoom />
	<ZoomOutButton bind:zoom />
	<!-- <DevButton  /> -->
</div>
<div class="flex-1 overflow-auto">
	<NodeList {space} />
</div>
