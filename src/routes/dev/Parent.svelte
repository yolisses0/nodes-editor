<script lang="ts">
	import { setContext } from 'svelte';
	import Child from './Child.svelte';

	const devContext = $state({ value: 2 });
	setContext('devValue', devContext);

	function handleClick() {
		devContext.value += 1;
	}
</script>

<div>
	parent value {devContext.value}
</div>
<button onclick={handleClick}>increase</button>
<Child />
