<script lang="ts">
	import Footer from '$lib/Footer.svelte'
	import Header from '$lib/Header.svelte'
	import './app.css'

	let { children } = $props()
</script>

<svelte:head>
	<title>Artgenosse Videosuche</title>
	<meta
		name="description"
		content="Diese Seite hilft dabei, schnell das richtige Video vom Artgenossen zu finden."
	/>
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Artgenosse Videosuche" />
	<link rel="manifest" href="/site.webmanifest" />
</svelte:head>

<div class="page">
	<div class="wrapper">
		<Header />
		{@render children?.()}
	</div>

	<Footer />
</div>

<style>
	.page {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.wrapper {
		width: min(95vw, 520px);
		margin-inline: auto;
		flex: 1;
	}
</style>
