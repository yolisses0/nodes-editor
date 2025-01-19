<script lang="ts">
	import VariableSizeComponent from '../VariableSizeComponent.svelte';
	import MovableComponent from './MovableComponent.svelte';

	let counter = $state(0);
	let content: Element;
	let container: Element;
	let savedObserver: IntersectionObserver;

	function getRootMargin(content: Element, container: Element) {
		const contentRect = content.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();

		/* top | right | bottom | left */
		let leftMargin = 1 + containerRect.left - contentRect.left;
		let topMargin = 1 + containerRect.top - contentRect.top;
		let rightMargin = 1 + contentRect.right - containerRect.right;
		let bottomMargin = 1 + contentRect.bottom - containerRect.bottom;

		if (!Number.isInteger(leftMargin)) {
			leftMargin++;
		}
		if (!Number.isInteger(topMargin)) {
			topMargin++;
		}
		if (!Number.isInteger(rightMargin)) {
			rightMargin++;
		}
		if (!Number.isInteger(bottomMargin)) {
			bottomMargin++;
		}

		console.log({ topMargin, rightMargin, bottomMargin, leftMargin });

		const rootMargin = [topMargin, rightMargin, bottomMargin, leftMargin].join('px ') + 'px';
		console.log(rootMargin);
		return rootMargin;
	}

	function createIntersectionObserver(content: Element, container: Element) {
		return new IntersectionObserver(
			(entries, observer) => {
				counter++;
				const [entry] = entries;

				console.log(entry.intersectionRatio);
				console.log('content', content.getBoundingClientRect());
				console.log('container', container.getBoundingClientRect());

				if (!entry.isIntersecting) {
					observer.disconnect();
					const newObserver = createIntersectionObserver(content, container);
					newObserver.observe(content);
					savedObserver = newObserver;
				}
			},
			{
				root: container,
				threshold: 1,
				rootMargin: getRootMargin(content, container),
			},
		);
	}

	$effect(() => {
		const observer = createIntersectionObserver(content, container);
		observer.observe(content);

		return () => {
			if (savedObserver) {
				savedObserver.disconnect();
			}
		};
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
