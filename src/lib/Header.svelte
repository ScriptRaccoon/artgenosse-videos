<script>
	import { page } from '$app/state'
</script>

<header>
	<h1>Artgenosse Videosuche</h1>

	{#if page.url.pathname === '/'}
		<a href="/about">Info</a>
	{:else if page.url.pathname === '/about'}
		<a href="/">Suche</a>
	{/if}
</header>

<style>
	header {
		padding: 1rem;
		text-align: center;
	}

	h1 {
		font-size: 2.25rem;
	}
</style>
