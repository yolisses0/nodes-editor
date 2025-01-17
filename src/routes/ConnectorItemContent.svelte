<script lang="ts">
	import JointCircle from './JointCircle.svelte';
</script>

<div class="connector-item-content">
	<JointCircle />
	<div>Some connector</div>
</div>

<style>
	.connector-item-content {
		gap: 10px;
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.connector-item-content:hover {
		background-color: #fff4;
	}
</style>
