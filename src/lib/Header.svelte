<script>
	import { page } from '$app/state'
	import { Info, Search } from '@lucide/svelte'
</script>

<header>
	<h1>Artgenosse Videosuche</h1>

	{#if page.url.pathname === '/'}
		<a href="/about"><Info /> Info </a>
	{:else if page.url.pathname === '/about'}
		<a href="/"><Search /> Suche </a>
	{/if}
</header>

<style>
	header {
		padding: 1rem;
		text-align: center;
	}

	a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
	}

	h1 {
		font-size: 2.25rem;
	}
</style>
