<script lang="ts">
	import { MoveObserver } from '$lib/position/MoveObserver.js';
	import MovableComponent from './MovableComponent.svelte';

	let content: Element;
	let container: Element;

	$effect(() => {
		const observer = new MoveObserver(
			(entries) => {
				console.log(entries);
			},
			{ root: container },
		);
		observer.observe(content);

		return () => observer.unobserve(content);
	});
</script>

<div style="position: relative;" bind:this={container}>
	<MovableComponent>
		<div bind:this={content}>content</div>
	</MovableComponent>
</div>

<style>
	:global(body, html) {
		margin: 0;
	}
</style>
