const { redirect } = require('express/lib/response')
const DataBase = require('../database/config')
const Twit = require('twit')
const { response, text } = require('express')

const twitterSearcher = new Twit({
    bearer_token : 'AAAAAAAAAAAAAAAAAAAAAOWaeAEAAAAAJpq08lxdmSXYuv%2BaaEuBS48YhdI%3DmozqPJlPjlMMb35x07uWT8dGw3IS3X1vNsfCToQfk7MhoOxoFO',
    consumer_key : 'XzYqloSQpoVxKK9ZUdfQa4Aeh',
    consumer_secret : '32K3xQ2ES2df8I7bjTt1cvz5yX4npD40NXEsh1yANxkmtrcGHO',
    access_token : '1043690690180521984-kGznJJcDnE4vzY4RJvReXcVFNDtZbz',
    access_token_secret : 'Hr4xtfUp0ZtltcOJbmC5WAC6DCV8fV1kgHCKqekMWp7Xm',
    timeout_ms: 60 * 1000,
})

module.exports = {
    async getTrends(region){
        const db = await DataBase()

        const woeidSplited = region.split('-')

        switch (woeidSplited[1]){
            case "BR":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "RJ":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "GO":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "SP":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "BA":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "AM":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "PR":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    await db.run('DELETE FROM twitterTrends')
                    const trends = data[0].trends
                    for(let trend of trends){
                        if(trend.promoted_content === null){
                            trend.promoted_content = 0
                        }
                        await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${woeidSplited[1]}")`)
                    }
                })
                break
            case "RS":
                twitterSearcher.get(`https://api.twitter.com/1.1/trends/place.json?id=${woeidSplited[0]}`, async (err, data, response) => {
                    for(let eachTopic of data){
                        let trends = eachTopic.trends

                        for(let i = 0; i < 20; i++){
                            await db.run(`INSERT INTO twitterTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trends[i].name}", "${trends[i].url}", ${trends[i].promoted_content}, "${trends[i].query}", ${trends[i].tweet_volume}, "${region}")`)
                        }
                    }
                    await db.close()
                })
                break
            default:
                console.log("Deu alguma merda aí, irmão...")
        }
    },

    async getLastTweets(atSign, amount){
        const db = await DataBase()

        await db.run('DELETE FROM searchedTweets')

        twitterSearcher.get(`https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${atSign.replace('@', '')}&count=${amount}`, async (err, data, response) => {
            for(let i = 0; i < amount; i++){

                let user = data[i].user

                await db.run(`INSERT INTO searchedTweets(id, name, sign, text, created_at) VALUES(${data[i].id}, "${user.name}", "@${atSign.replace('@', '')}", "${data[i].text}", "${data[i].created_at}")`)
            }
            await db.close()
        })         
    },
}
