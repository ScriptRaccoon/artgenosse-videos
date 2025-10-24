<script lang="ts">
	import videos from '$lib/data/videos.json'
	import excluded_ids from '$lib/data/excluded.json'
	import VideoList from '$lib/VideoList.svelte'
	import type { YouTubeVideo } from '$lib/types'

	let query = $state('')

	videos satisfies YouTubeVideo[]

	const relevant_videos = videos.filter(
		(video) => !excluded_ids.includes(video.id)
	)

	let displayed_videos = $derived(
		!query
			? relevant_videos
			: relevant_videos.filter((video) =>
					(video.title + ' ' + video.description)
						.toLowerCase()
						.includes(query.toLowerCase())
				)
	)
</script>

<input
	class="input"
	bind:value={query}
	type="search"
	name="query"
	aria-label="Suchbegriff"
	placeholder="Suchbegriff ..."
	required
/>

<p>
	{#if displayed_videos.length === 1}
		1 Video wurde gefunden
	{:else}
		{displayed_videos.length} Videos wurden gefunden
	{/if}
</p>

<VideoList videos={displayed_videos} />

<style>
	p {
		text-align: center;
	}

	input {
		width: 100%;
	}
</style>
