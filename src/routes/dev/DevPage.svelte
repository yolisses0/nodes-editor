<script lang="ts">
	import MovableComponent from './MovableComponent.svelte';

	let content: Element;
	let container: Element;

	function getRootMargin() {
		const contentRect = content.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		console.log(contentRect);
		console.log(containerRect);

		/* top | right | bottom | left */

		return (
			[
				containerRect.top - contentRect.top, // ok
				contentRect.right - containerRect.right, // ok
				contentRect.bottom - containerRect.bottom, // ok
				containerRect.left - contentRect.left, // ok
			].join('px ') + 'px'
		);
	}

	$effect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				console.log(entry.isIntersecting, entry.boundingClientRect, entry.rootBounds);
			},
			{ root: container, rootMargin: getRootMargin(), threshold: 1 },
		);

		observer.observe(content);
	});
</script>

<div style="padding: 30px;">
	<div class="container" bind:this={container}>
		<div class="initial-marker"></div>
		<MovableComponent>
			<div bind:this={content} class="content">content</div>
		</MovableComponent>
	</div>
</div>

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
