<script lang="ts">
	import { add, MoveObserver } from 'rect-observer';
	import VariableSizeComponent from '../VariableSizeComponent.svelte';
	import MovableComponent from './MovableComponent.svelte';

	let content: Element;
	let container: Element;
	let counter = $state(0);

	console.log(add(1, 2));

	$effect(() => {
		const observer = new MoveObserver(
			(entries) => {
				console.log(entries);
				counter++;
			},
			{ root: container },
		);
		observer.observe(content);

		return () => observer.disconnect();
	});
</script>

<!-- <div style="padding: 30px;">
</div> -->
<div class="container" bind:this={container}>
	<div class="initial-marker"></div>
	<MovableComponent>
		<VariableSizeComponent />
		<div bind:this={content} class="content">content</div>
	</MovableComponent>
</div>
{counter}

<style>
	:global(body, html) {
		margin: 0;
	}

	.initial-marker {
		width: 50px;
		height: 20px;
		position: absolute;
		outline: 1px solid green;
		top: 10px;
		left: 10px;
	}

	.content {
		width: 50px;
		height: 20px;
	}

	.container {
		width: 100px;
		height: 300px;
		position: relative;
		background-color: red;
	}
</style>
