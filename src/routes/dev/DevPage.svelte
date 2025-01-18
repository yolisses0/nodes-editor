<script lang="ts">
	import MovableComponent from './MovableComponent.svelte';

	let content = $state<Element>();
	let container = $state<Element>();

	$effect(() => {
		const observer = new ResizeObserver((entries) => {
			console.log(entries[0].target, entries[0].contentRect);
		});

		if (content) {
			observer.observe(content);
			console.log('observe');
		}

		return () => {
			if (content) {
				observer.unobserve(content);
				console.log('unobserve');
			}
		};
	});
</script>

<div style="height: 2000px; background-color: red;"></div>
<div bind:this={container} style="min-height: 600px;">
	container
	<MovableComponent bind:element={content} {container} />
</div>

<style>
	div {
		outline: 2px solid blue;
	}
</style>
