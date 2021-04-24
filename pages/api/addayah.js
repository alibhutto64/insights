import { connectToDatabase } from "../../util/mongodb";

/* surah, aya, note 
    aya
:33
note
:"5 things that are forbidden in islam"
surah
:7
time
:1608419255494
trans
:
Array
para
:6

*/

export default async function addayah(req, res) {

    let ayah = {
        aya: req.body.aya,
        note: req.body.note,
        surah: req.body.surah,
        time: Date.now()
    }

    // add translation
    const trans_raw = await fetch(`https://quranenc.com/api/translation/aya/english_saheeh/${req.body.surah}/${req.body.aya}`)
    const trans_data = await trans_raw.json();

    ayah.trans = [trans_data.result.translation]


    //add paragraph no. for tafseer
    const para_raw = await fetch(`https://javedahmedghamidi.org/api/albay/getparabychap?chapter=${req.body.surah}`, {
        headers: {
            "authorization": "XfYvinZg4REun2qnG1x4djC91226zy59"
        }
    })
    const para_data = await para_raw.json();

    ayah.para = para_data[req.body.aya].albParagraph

    console.log(ayah)

    // const { db } = await connectToDatabase();
    // const quran = await db.collection("quran")

    // // Update collection
    // references.map(async (reference) => {

    //     // const trans_raw = await fetch(`https://quranenc.com/api/translation/aya/english_saheeh/${reference.surah}/${reference.aya}`)
    //     // const trans_data = await trans_raw.json();

        

    //     // console.log(data[reference.aya].albParagraph)
    //     const result = await quran.findOneAndUpdate({ surah: reference.surah, aya: reference.aya }, {
    //         $set: {
    //             para: data[reference.aya].albParagraph
    //         }
    //     })
    //     console.log(result.modifiedCount);
    // })

    // ADD new collection
    // const result = await quran.insertMany(notes)
    // res.send(result.insertedCount)


    res.send(ayah)

}