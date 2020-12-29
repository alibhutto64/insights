import { connectToDatabase } from "../../util/mongodb";

export default async function bookmark(req,res) {
  const { db } = await connectToDatabase();
   const videos = await db.collection("videos")

   const result = await videos.findOneAndUpdate({videoId: req.body.videoId}, {$push: {
      bookmarks: {
        time: req.body.currentTime,
        note: req.body.note
      }
    }} )
  console.dir(result.modifiedCount);
  // result.forEach(video=> console.log(video))
  res.send("hello");
}


