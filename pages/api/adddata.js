import { connectToDatabase } from "../../util/mongodb";
import references from "../../public/json/ref.json"
export default async function adddata(req,res) {

        const { db } = await connectToDatabase();
        const quran = await db.collection("quran")

        // Update collection
        references.map(async (reference) => {

                // const trans_raw = await fetch(`https://quranenc.com/api/translation/aya/english_saheeh/${reference.surah}/${reference.aya}`)
                // const trans_data = await trans_raw.json();

                const raw = await fetch(`https://javedahmedghamidi.org/api/albay/getparabychap?chapter=${reference.surah}`, {
                        headers: {
                                "authorization": "XfYvinZg4REun2qnG1x4djC91226zy59"
                        }
                })
                const data = await raw.json();

                // console.log(data[reference.aya].albParagraph)
                const result = await quran.findOneAndUpdate({ surah: reference.surah, aya: reference.aya}, {$set: {
                        para: data[reference.aya].albParagraph
                }
                })
                console.log(result.modifiedCount);
        })
        
        // ADD new collection
        // const result = await quran.insertMany(notes)
        // res.send(result.insertedCount)
        

        res.send('done!')
        
}