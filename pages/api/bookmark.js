import { connectToDatabase } from "../../util/mongodb";

export default async function bookmark(req,res) {
  const { db } = await connectToDatabase();
   const videos = await db.collection("videos")

   if (req.body.action == 'add'){
     
     const result = await videos.findOneAndUpdate({videoId: req.body.videoId}, {$push: {
        bookmarks: {
          time: req.body.time,
          note: req.body.note
        }
      }} )
    // result.forEach(video=> console.log(video))
    res.send(result.value);
   }

   else if (req.body.action == 'delete') {
     const index = "bookmarks."+req.body.bookmarkIndex
     const result = await videos.findOneAndUpdate({ videoId: req.body.videoId }, {
       $pull: {
         bookmarks: { time: req.body.time }
       }
     })
     res.send(result.modifiedCount);
   }

}


