import { connectToDatabase } from "../../util/mongodb";
const got = require('got');
const cheerio = require('cheerio');
const tunnel = require('tunnel');

export default async function videos(req, res) {

    if (req.body.action == 'add') {
        let videoData
        let tunnelingAgent = tunnel.httpsOverHttp({
            proxy: {
                host: 'localhost',
                port: 8889
            }
        });
        //getting all video data
        try {
            const response = await got(`https://www.youtube.com/watch?v=${req.body.id}`, {
                agent: {
                    https: tunnelingAgent
                }
            });
            const $ = cheerio.load(response.body);

            videoData = {
                videoId: req.body.id,
                cat: req.body.cat,
                title: $("meta[property='og:title']").attr('content'),
                image: $("meta[property='og:image']").attr('content'),
                desc: $("meta[property='og:description']").attr('content'),
                bookmarks: []
            }
        }
        catch (e) {
            console.log(e.response.body)
        }

        // insert to database
        const { db } = await connectToDatabase();
        const videos = await db.collection("videos")
        const result = await videos.insertOne(videoData)

        res.send(result.value)
    }

    else if (req.body.action == 'delete') {
        const { db } = await connectToDatabase();
        const videos = await db.collection("videos")
        const result = await videos.deleteOne({videoId: req.body.id})
        console.log(result.value)
        res.send(result.value)
    }

}