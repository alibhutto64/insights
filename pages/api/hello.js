const got = require('got');
const cheerio = require('cheerio');
const tunnel = require('tunnel');

export default async function handler(req, res) {
  const response = await got('https://www.youtube.com/watch?v=LXJOvkVYQqA', {
    agent: {
      https: tunnel.httpsOverHttp({
        proxy: {
          host: 'localhost',
          port: '8888'
        }
      })
    }
  });
  
  const $ = cheerio.load(response.body);
  // res.status(200).json(
  //   { 
  //     partOfSpeech: $('.fl').text(), 
  //     defination: $('.def_text').text(),
  //     example: $('.vi_content').text()

  //   }
  //   )
  console.log($("meta[property='og:title']").attr('content'))
  res.send('ok')
}
