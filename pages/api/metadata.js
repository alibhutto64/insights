import { connectToDatabase } from "../../util/mongodb";
import { getLinkPreview } from 'link-preview-js'
const got = require('got');
const cheerio = require('cheerio');
const tunnel = require('tunnel');

export default async function metadata(req,res) {

  if (req.body.type == 'article') {
		getLinkPreview(req.body.videoID)
		.then(data=> {
			console.log(data)
		})
	}

	else if(req.body.type == 'video')  {
		//getting all video data
		const response = await got(`https://www.youtube.com/watch?v=${req.body.videoId}`, {
			agent: { https: tunnel.httpsOverHttp({
					proxy: {
						host: 'localhost',
						port: '8888'
					}
				})
			}
		});
		const $ = cheerio.load(response.body);
		const videoData = {
			videoId: req.body.videoId,
			cat: req.body.cat,
			title: $("meta[property='og:title']").attr('content'),
			image: $("meta[property='og:image']").attr('content'),
			desc: $("meta[property='og:description']").attr('content'),
			bookmarks: []
		}
		// inserting it to database
		const { db } = await connectToDatabase();
		const videos = await db.collection("videos")
		const result = await videos.insertOne(videoData)

		res.send(result.insertedCount)
	}
}