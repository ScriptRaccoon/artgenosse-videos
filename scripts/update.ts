import { google } from 'googleapis'
import fs from 'fs'
import path from 'path'

import dotenv from 'dotenv'
dotenv.config()

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY

if (!YOUTUBE_API_KEY) {
	throw 'No YouTube API key found'
}

// YouTube Channel ID of "Der Artgenosse"
const CHANNEL_ID = 'UC1LTWhnte4f7XrkLQvkdRug'

const youtube = google.youtube({
	version: 'v3',
	auth: YOUTUBE_API_KEY
})

/**
 * {@link https://developers.google.com/youtube/v3/docs/playlists/list}
 */
async function get_videos() {
	const channel = await youtube.channels.list({
		id: [CHANNEL_ID],
		part: ['contentDetails']
	})

	const uploads_id =
		channel.data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads

	if (!uploads_id) throw new Error('No uploads playlist found.')

	const videos: any[] = []
	let nextPageToken: string | undefined

	do {
		const res = await youtube.playlistItems.list({
			playlistId: uploads_id,
			part: ['snippet', 'contentDetails'],
			maxResults: 50,
			pageToken: nextPageToken
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

		nextPageToken = res.data.nextPageToken ?? undefined
	} while (nextPageToken)

	return videos
}

async function main() {
	try {
		console.info('Fetching videos ...')
		const videos = await get_videos()
		console.info(`Found ${videos.length} videos`)
		const file_path = path.resolve('src', 'lib', 'data', 'videos.json')
		fs.writeFileSync(file_path, JSON.stringify(videos), 'utf8')
		console.info(`Saved videos to ${file_path}`)
	} catch (err) {
		console.error('Error fetching videos\n', err)
	}
}

main()
