<script lang="ts">
	import { getContext } from 'svelte';

	const devContext = getContext('devValue') as { value: number };
</script>

{devContext?.value}
