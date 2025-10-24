<script lang="ts">
	import type { YouTubeVideo } from './types'
	import VideoCard from './VideoCard.svelte'

	type Props = {
		videos: YouTubeVideo[]
	}

	let { videos }: Props = $props()
</script>

<ul>
	{#each videos as video (video.id)}
		<li>
			<VideoCard {video} />
		</li>
	{/each}
</ul>

<style>
	ul {
		margin-top: 2rem;
		list-style: none;
		padding-inline: 0.5rem;
	}

	li {
		margin-bottom: 2rem;
	}
</style>
