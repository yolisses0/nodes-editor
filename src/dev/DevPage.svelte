<script lang="ts">
	class DevPointerStrategy {
		onpointerdown() {
			console.log('hello');
		}
	}
	const devPointerStrategy = new DevPointerStrategy();
</script>

<button onpointerdown={devPointerStrategy.onpointerdown}> click me </button>
