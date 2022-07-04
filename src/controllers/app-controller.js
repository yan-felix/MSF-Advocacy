const { render } = require("express/lib/response")
const res = require("express/lib/response")
const DataBase = require("../database/config")
const twitterSearcherController = require('./twitter-searcher-controller')


const Account = {
    async validateInformations(email, password){
        const db = await DataBase()

        const userExist =  await db.all(`SELECT email, password FROM users WHERE email = "${email}" AND password = "${password}"`)

        if(userExist.length === 0){
            console.log('login ou senha inválidos, por favor revise as informações e tente novamente.')
            return {validated: false, user_id: ''}
        }else{
            const userID =  await db.all(`SELECT user_id FROM users WHERE email = "${email}" AND password = "${password}"`)

            return {validated: true, user_id: userID[0].user_id}
        }
    },
}

const Filter = {
    importantThemes:[
        "presidente",
        "eleição",
        "hepatite c",
        "crise",
        "pec",
        "pl",
        "projeto de lei",
        "ministéio da saúde",
        "senado",
        "câmara dos deputados",
        "câmara",
        "camara",
        "cpi",
        "doações",
        "doação",
        "refigiados",
        "migração",
        "tragédia",
        "desastre",
        "covid-19",
        "covid 19",
        "covid19",
        "ajuda humanitária",
        "icms",
        "remédio",
        "remedios",
        "alagamento",
        "enchente",
        "deslizamento",
        "pandemia",
        "surto",
        "endemia",
        "clima",
        "climática",
        "aquecimento global",
        "humanitária",
        "msf",
        "médicos sem fronteiras"
    ],

    async registerImportantTrends(filteredTrends){
        const db = await DataBase()

        await db.run('DELETE FROM importantTrends')

        for(let trend of filteredTrends){
            await db.run(`INSERT INTO importantTrends(name, url, promoted_content, query, tweet_volume, region) VALUES("${trend.name}", "${trend.url}", ${trend.promoted_content}, "${trend.query}", ${trend.tweet_volume}, "${trend.region}")`)
        }
        await db.close()
    },

    async filterTheme(){
        const db = await DataBase()  

        const twitterTrends = await db.all(`SELECT * FROM twitterTrends`)

        await db.close()

        let filteredTrends = []
        
        twitterTrends.forEach(trend =>{
            for(let i = 0; i < Filter.importantThemes.length - 1; i++){
                let trendName = trend.name.toLowerCase()
                if(trendName.includes(`${Filter.importantThemes[i]}`)){
                    filteredTrends.push(trend)
                }
            }
        })

        await Filter.registerImportantTrends(filteredTrends)
    },
}

const Notificator = {
    async checkStrangerMoves(){
        const db = await DataBase()

        let importantTrends = await db.all(`SELECT * FROM importantTrends`)

        let notification = []
        
        importantTrends.forEach(trend =>{
            let trendCount = trend.tweet_volume

            if(trendCount > 100){
                notification.push(trend)
            }
        })
        return notification
        
    }
}

module.exports = {
    async createAccount(req, res){
        const db = await DataBase()

        const informedName = req.body.Create_Account_Name_Input

        const informedEmail = await req.body.Create_Account_Email_Input

        const informedPassword = await req.body.Create_Account_Password_Input

        await db.run(`INSERT INTO users(name, email, password, interests) VALUES( "${informedName}", "${informedEmail}", "${informedPassword}", "")`)

        await db.close()
        res.redirect('/loagin')

    },

    async getIn(req, res){
        const db = await DataBase()

        const informedEmail = await req.body.Get_In_Email_Input

        const informedPassword = await req.body.Get_In_Password_Input

        const access = await Account.validateInformations(informedEmail, informedPassword)

        if(access.validated === true){
            brasilWoeid = "23424768-BR"
            res.redirect(`/home/${brasilWoeid}`)
        }else{
            res.render('invalid-access.ejs')
        }

        await db.close()
    },

    async loadHome(req, res){
        const db = await DataBase()

        const regionWoeid = req.params.region

        await twitterSearcherController.getTrends(regionWoeid)
        
        await Filter.filterTheme()
        
        await Notificator.checkStrangerMoves()
        
        const importantThemes = await db.all('SELECT * FROM importantTrends')
        
        const generalTrends = await db.all(`SELECT * FROM twitterTrends`)

        let top6Trends = []
        
        if(importantThemes.length < 6){
            importantThemes.forEach(trend => {
                top6Trends.push(trend)
            })

            for(let i = 6 - importantThemes.length; i > 0; i--){
                top6Trends.push(generalTrends[6-i])
            }   
        }
        res.render("home", {top6Trends: top6Trends})
    },

    async searchTweets(req, res){
        const userID = req.params.user_id

        const atSign = req.body.Twitter_Theme_Iinput

        const amount = req.body.Twitter_Amount_Input

        await twitterSearcherController.getLastTweets(atSign, amount)

        res.redirect(`/twitter_searcher/${atSign}`)
    },

    async showSearchedTweets(req, res){
        const db = await DataBase()

        const userID = req.params.user_id

        const atSign = req.params.searched_tweets

        const searchedTweets = await db.all('SELECT * FROM searchedTweets')

        await db.close()

        res.render('searched-tweet', {userID: userID, atSign: atSign, searchedTweets: searchedTweets})
    } 
}
