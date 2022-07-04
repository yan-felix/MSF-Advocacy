const DataBase = require("./config")

const initDataBase = {
    async init(){
        const db = await DataBase()

            await db.exec(`CREATE TABLE twitterTrends (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, promoted_content INT, query TEXT, tweet_volume INTEGER, region TEXT)`);
             
            await db.exec(`CREATE TABLE importantTrends (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, promoted_content INT, query TEXT, tweet_volume INTEGER, region TEXT)`);

            await db.exec(`CREATE TABLE users (user_id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT, interests TEXT)`);
            
            await db.exec(`CREATE TABLE searchedTweets (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, sign TEXT, text TEXT, created_at TEXT)`);

            await db.run(`INSERT INTO users(name, email, password, interests) VALUES("Yan Félix", "yanfelix@admin.br", "75395182", "")`)
            
            await db.run(`INSERT INTO users(name, email, password, interests) VALUES("Felipe Soares", "felipesoares@admin.br", "75395182", "")`)
        
        await db.close()
    }
}

initDataBase.init()