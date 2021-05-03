import { connectToDatabase } from "../../util/mongodb";
import { getLinkPreview } from 'link-preview-js'
const got = require('got');
const cheerio = require('cheerio');
const tunnel = require('tunnel');

export default async function articles(req,res) {

  	if (req.body.action == 'add') {

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
}