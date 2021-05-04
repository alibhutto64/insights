import { connectToDatabase } from "../../util/mongodb";
const tunnel = require('tunnel');
const got = require('got');


export default async function addayah(req, res) {

    let ayah = {
        aya: req.body.aya,
        note: req.body.note,
        surah: req.body.surah,
        time: Date.now()
    }

    let tunnelingAgent = tunnel.httpsOverHttp({
            proxy: {
                host: 'localhost',
                port: 8889
            }
        });
        try {

       
    // add translation
    const trans_data = await got(`https://quranenc.com/api/translation/aya/english_saheeh/${req.body.surah}/${req.body.aya}`, {
                agent: {
                    https: tunnelingAgent
                }
            }).json()

            console.log(trans_data)
    ayah.trans = [trans_data.result.translation]


    //add paragraph no. for tafseer
    const para_data = await got(`https://javedahmedghamidi.org/api/albay/getparabychap?chapter=${req.body.surah}`, {
        headers: {
            "authorization": "XfYvinZg4REun2qnG1x4djC91226zy59"
        },
        agent: {
            https: tunnelingAgent
        }
    }).json()
    console.log(para_data)
    ayah.para = para_data[req.body.aya].albParagraph
     }
     catch(e) {
        console.log(e.response.body)
     }

    const { db } = await connectToDatabase();
    const quran = await db.collection("quran")

    const result = await quran.insertOne(ayah)
    res.send(result.value)

    // Update collection
    // references.map(async (reference) => {

        // const trans_raw = await fetch(`https://quranenc.com/api/translation/aya/english_saheeh/${reference.surah}/${reference.aya}`)
        // const trans_data = await trans_raw.json();

        

        // console.log(data[reference.aya].albParagraph)
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

}