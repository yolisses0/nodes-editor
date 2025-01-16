<script lang="ts">
	import NodeList from '$lib/NodeList.svelte';
	import { Space } from '$lib/space/Space.js';
	import { ZoomConverter } from '$lib/space/ZoomConverter.js';
	import { getDevNodes } from './getDevNodes.js';

	const space = new Space([new ZoomConverter(20)]);
	const nodes = getDevNodes();
</script>

<NodeList {nodes} {space} />
