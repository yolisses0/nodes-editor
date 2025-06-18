<script lang="ts">
	import { Vector } from '$lib/index.js';
	import { getOffsetContext } from './offsetContext.js';

	interface Props {
		element: HTMLElement;
	}

	const { element }: Props = $props();

	const offsetContext = getOffsetContext();

	function handleClick() {
		offsetContext.offset = offsetContext.offset.add(new Vector(10, 0));
		element?.scrollBy({ top: 0, left: 10 });
	}
</script>

<button onclick={handleClick}> Add offset </button>
