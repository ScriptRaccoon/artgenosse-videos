import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

// YouTube Channel ID of "Der Artgenosse"
const CHANNEL_ID = 'UC1LTWhnte4f7XrkLQvkdRug'

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

if (!YOUTUBE_API_KEY) {
	throw new Error('No YouTube API key found')
}

const youtube = google.youtube({
	version: 'v3',
	auth: YOUTUBE_API_KEY
})

/**
 * Gets the ID of the hidden playlist with all uploads.
 * {@link https://developers.google.com/youtube/v3/docs/channels/list}
 */
async function get_uploads_id(channel_id: string) {
	const channel = await youtube.channels.list({
		id: [channel_id],
		part: ['contentDetails']
	})

	const uploads_id =
		channel.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

	if (!uploads_id) throw new Error('No uploads playlist found.')

	return uploads_id
}

/**
 * {@link https://developers.google.com/youtube/v3/docs/playlists/list}
 */
async function get_videos(channel_id: string) {
	const uploads_id = await get_uploads_id(channel_id)

	const videos: any[] = []
	let next_page_token: string | undefined

	do {
		const res = await youtube.playlistItems.list({
			playlistId: uploads_id,
			part: ['snippet', 'contentDetails'],
			maxResults: 50,
			pageToken: next_page_token
		})

		const items = res.data.items ?? []

		for (const item of items) {
			const id = item.contentDetails?.videoId
			const video = {
				id,
				title: item.snippet?.title,
				description: item.snippet?.description,
				thumbnail_url: item.snippet?.thumbnails?.medium?.url,
				url: `https://youtu.be/${id}`
			}
			videos.push(video)
		}

		next_page_token = res.data.nextPageToken ?? undefined
	} while (next_page_token)

	return videos
}

async function main() {
	try {
		console.info('Fetching videos ...')
		const videos = await get_videos(CHANNEL_ID)
		console.info(`Found ${videos.length} videos`)
		const file_path = path.resolve('src', 'lib', 'data', 'videos.json')
		fs.writeFileSync(file_path, JSON.stringify(videos), 'utf8')
		console.info(`Saved videos to ${file_path}`)
	} catch (err) {
		console.error('Error fetching videos\n', err)
	}
}

main()
