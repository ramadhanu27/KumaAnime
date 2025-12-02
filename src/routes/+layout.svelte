<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>KumaStream - Anime Streaming Site</title>
</svelte:head>

{@render children()}
