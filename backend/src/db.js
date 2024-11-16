const { player } = require('../components/classPlayer');

const sql = require('sqlite3').verbose();
const db = new sql.Database('../backend/database/usersInfo.db', (err) => {
    if (err) { console.log(err) }
});

let PROPS = 'CREATE TABLE IF NOT EXISTS usersInfo (userID INTEGER PRIMARY KEY UNIQUE, userName TEXT, userClass TEXT, userXP INTEGER)'

db.serialize(() => {
    db.run(PROPS)
    db.run('CREATE TABLE IF NOT EXISTS userSoli (numSoli INTEGER PRIMARY KEY, userSoli TEXT NOT NULL UNIQUE, userSoliClass TEXT NOT NULL, status BOOLEAN)')
})

function newPlayer (playerName, playerClass, playerXP) {

    if (!newPlayer) { console.log('No hay valores ingresados') } 

    // db.serialize(() => {
    //     db.run(`INSERT INTO usersInfo (userName, userClass, userXP) VALUES (${playerName}, ${playerClass}, ${playerXP})`)
    // })
}

function newSoli (playerName, playerClass) {

    // if (playerName == undefined) { return console.log('Nombre INVALID') }

    db.serialize(() => {
        db.run(`INSERT INTO userSoli (userSoli, userSoliClass, status) VALUES (?, ?, ?)`, [playerName, playerClass, false])
    })

}

module.exports = { newPlayer, newSoli }