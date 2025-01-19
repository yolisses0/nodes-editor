<script lang="ts">
	import CustomNodeList from './CustomNodeList.svelte';
	import { devConnections } from './devConnections.js';
	import { devNodes } from './devNodes.js';
</script>

<CustomNodeList nodes={devNodes} connections={devConnections} />
