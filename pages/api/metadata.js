import { connectToDatabase } from "../../util/mongodb";
import { getLinkPreview } from 'link-preview-js'
const got = require('got');
const cheerio = require('cheerio');
const tunnel = require('tunnel');
import youtube from "scrape-youtube"
const { HttpsProxyAgent } = require('hpagent')

export default async function metadata(req,res) {

  if (req.body.type == 'article') {

		//getting all video data
		const response = await got(req.body.articleLink, {
			agent: { https: tunnel.httpsOverHttp({
					proxy: {
						host: 'localhost',
						port: '8889'
					}
				})
			}
		});
		const $ = cheerio.load(response.body);
		const articleData = {
			url: req.body.articleLink,
			cat: req.body.cat,
			title: $("meta[property='og:title']").attr('content'),
			image: $("meta[property='og:image']").attr('content'),
			desc: $("meta[property='og:description']").attr('content'),
			tags: []
		}
		const { db } = await connectToDatabase();
		const articles = await db.collection("articles")
		const result = await articles.insertOne(articleData)

		res.send(result.insertedCount)
	}

	else if(req.body.type == 'video')  {
	  let videoData
	  let tunnelingAgent = tunnel.httpOverHttp({
		  proxy: {
			  host: '172.26.64.1',
			  port: 8889
		  }
	  });
		//getting all video data
		try {
			console.log(req.body)
			const response = await got(`https://www.youtube.com/watch?v=${req.body.videoId}`, {
				agent: {
					http: tunnelingAgent
				}
			});
			console.log(response.body)
			const $ = cheerio.load(response.body);

			videoData = {
				videoId: req.body.videoId,
				cat: req.body.cat,
				title: $("meta[property='og:title']").attr('content'),
				image: $("meta[property='og:image']").attr('content'),
				desc: $("meta[property='og:description']").attr('content'),
				bookmarks: []
			}
			console.log(videoData)
			console.log("last line");
		}
		catch(e) {
			console.log(e.response.body)
		}
			

		res.send('what')
		
		// inserting it to database
		// const { db } = await connectToDatabase();
		// const videos = await db.collection("videos")
		// const result = await videos.insertOne(videoData)

		// res.send(result.insertedCount)
	}
}