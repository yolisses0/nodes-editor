<script lang="ts">
	import { Vector } from '$lib/index.js';
	import { getOffsetContext } from './offsetContext.js';

	const offsetContext = getOffsetContext();

	function handleClick() {
		offsetContext.offset = offsetContext.offset.add(new Vector(10, 0));
	}
</script>

<button onclick={handleClick}> Add offset </button>
