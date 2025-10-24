<script lang="ts">
	import type { YouTubeVideo } from './types'

	type Props = {
		video: YouTubeVideo
	}

	let { video }: Props = $props()

	async function copy_url() {
		try {
			if (!('clipboard' in navigator)) throw 'Missing clipboard support'
			await navigator.clipboard.writeText(video.url)
			copied = true
			setTimeout(() => {
				copied = false
			}, 2500)
		} catch (err) {
			console.error(err)
		}
	}

	let copied = $state(false)

	let summary_length = video.description.includes('\n')
		? video.description.indexOf('\n')
		: 100

	let expanded = $state(false)
</script>

<div class="video">
	<h2>
		<a href={video.url}>{video.title}</a>
	</h2>

	<a href={video.url} aria-label={video.title} tabindex="-1" aria-hidden="true">
		<img src={video.thumbnail_url} alt="" />
	</a>

	<div class="description_container">
		{#if expanded}
			<div class="description">
				{@html video.description.replaceAll('\n', '<br>')}
			</div>
		{:else}
			<div class="description">
				{video.description.slice(0, summary_length)}
			</div>

			<button onclick={() => (expanded = !expanded)}>Mehr...</button>
		{/if}
	</div>

	<button class="copy_btn button" onclick={copy_url}>
		{#if copied}
			URL wurde kopiert!
		{:else}
			URL kopieren
		{/if}
	</button>
</div>

<style>
	.video {
		background-color: var(--card-color);
		padding: 1rem;
		border-radius: 0.5rem;
		box-shadow: 0 0 1rem #0006;
		position: relative;
	}

	h2 {
		font-size: 1.5rem;
		line-height: 1.2;
		margin-bottom: 1rem;
	}

	a {
		text-decoration: none;

		&:hover {
			text-decoration: underline;
		}
	}

	img {
		width: 100%;
		border-radius: 0.5rem;
	}

	.description_container {
		margin-block: 0.5rem 1rem;
	}

	.description {
		overflow: hidden;
		color: var(--secondary-font-color);
		margin-bottom: 0.5rem;

		@media (max-width: 600px) {
			font-size: 0.875rem;
		}
	}

	.copy_btn {
		width: 100%;
	}
</style>
