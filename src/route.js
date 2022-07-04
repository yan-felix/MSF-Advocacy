const express = require('express');
const { redirect } = require('express/lib/response');
const appController = require('./controllers/app-controller')
const twitterSearcherController = require('./controllers/twitter-searcher-controller')

const routes = express.Router()

routes.get('/', (req, res) => {
     res.render("index.ejs")
});

routes.get('/index', (req, res) => {
     res.render("index.ejs")
});

routes.get('/loagin', (req, res) => {
     res.render('login.ejs')
})

routes.get('/home/:region', appController.loadHome)
/*
routes.get('/home/:user_id/trends', appController.loadTrends)

routes.get('/home/:user_id/trends/:state', appController.loadStateTrends)

routes.get(`/twitter_searcher/:searched_tweets`, appController.showSearchedTweets)

routes.get('/home/:user_id/actions_plans', (req, res) => {
     res.render('actions-plan.ejs')
})
*/
routes.post('/create', appController.createAccount )

routes.post('/get_in', appController.getIn)

routes.post(`/search_tweet`, appController.searchTweets)




module.exports = routes