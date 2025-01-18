<script lang="ts">
	import MovableComponent from './MovableComponent.svelte';

	let content = $state<Element>();

	ResizeObserver;
</script>

<MovableComponent bind:element={content} />

<style>
	:global(body, html) {
		margin: 0;
	}
</style>
