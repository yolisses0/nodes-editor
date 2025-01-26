<script lang="ts">
	class DevPointerStrategy {
		onpointerdown() {}
	}
	const devPointerStrategy = new DevPointerStrategy();
</script>

<button onpointerdown={devPointerStrategy.onpointerdown}> click me </button>
