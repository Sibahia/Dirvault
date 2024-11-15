const { player } = require('../components/classPlayer');

const sql = require('sqlite3').verbose();
const db = new sql.Database('../backend/database/usersInfo.db', (err) => {
    if (err) { console.log(err) }
});

let PROPS = 'CREATE TABLE IF NOT EXIST usersInfo (userID INTEGER PRIMARY KEY UNIQUE, userName TEXT, userClass TEXT, userXP INTEGER)'

db.serialize(() => {
    db.run(PROPS)
})

function newPlayer (playerName, playerClass, playerXP) {

    db.serialize(() => {
        db.run(`INSERT INTO usersInfo (userName, userClass, userXP) VALUES (${playerName}, ${playerClass}, ${playerXP})`)
    })
}

exports = { newPlayer }