import { connectToDatabase } from "../../util/mongodb";
import notes from "../../public/json/notes.json"
export default async function adddata(req,res) {
        const { db } = await connectToDatabase();
        const quran = await db.collection("quran")
        const result = await quran.insertMany(notes)
        res.send(result.insertedCount)
}