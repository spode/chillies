<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

{@render children()}

<svelte:head>
	<title>Chill lofi streams</title>
</svelte:head>
