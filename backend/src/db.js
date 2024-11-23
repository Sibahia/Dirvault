const { player } = require('../components/classPlayer');
const { Validation, ConnectionError } = require('../components/typesError');

const sql = require('sqlite3').verbose();
const db = new sql.Database('../backend/database/usersInfo.db', (err) => {
    if (err) { console.log(err) }
});

let PROPS = 'CREATE TABLE IF NOT EXISTS usersInfo (userID INTEGER PRIMARY KEY UNIQUE, userName TEXT, userClass TEXT, userXP INTEGER)'

db.serialize(() => {
    db.run(PROPS)
    db.run('CREATE TABLE IF NOT EXISTS userSoli (numSoliName INTEGER PRIMARY KEY, userSoliName TEXT NOT NULL UNIQUE, userSoliClass TEXT NOT NULL, status BOOLEAN)')
})

function newPlayer (playerName, playerClass, playerXP) {

    if (!newPlayer) { console.log('No hay valores ingresados') } 

    db.serialize(() => {
        db.run(`INSERT INTO usersInfo (userName, userClass, userXP) (?, ?, ?)`, [playerName, playerClass, playerXP])
    })
}

function newSoli (playerName, playerClass) {
    
    db.serialize(() => {
        db.run(`INSERT INTO userSoli (userSoliName, userSoliClass, status) VALUES (?, ?, ?)`, [playerName, playerClass, false])
        })
    }

function getSolis (rows) {
    return new Promise((resolve, reject) => {
        db.all('SELECT userSoliName, userSoliClass, status FROM userSoli', [], (err, row) => {
            if (err)  {
                reject('database error')
            } else {
                resolve(row)
            }
            
        })
    })

}

function getUserDb (data) {
        return new Promise((resolve, reject) => {
            if (!data) return reject('not have data') ;
            db.get('SELECT userSoliName, userSoliClass, status FROM userSoli WHERE numSoliName = ? OR userSoliName = ?', [data, data], (err, rows) => {
                if (!rows) return reject('id not exists');
                try {
                    resolve(rows);
                } catch (error) {
                    reject('database error');
                };
            });
        });
}

function getUsersClass (data) {
    return new Promise((resolve, reject) => {
        if (!data) return reject('not have data')
        db.all('SELECT userSoliName, userSoliClass, status FROM userSoli WHERE userSoliClass = ?', [data], (err, rows) => {
            if (rows == 0) return reject('there is no data')
            if (!rows) return reject('class not exists')
                try {
                    resolve(rows);
                } catch (error) {
                    reject('database error')
                }
        })
    })
}

module.exports = { newPlayer, newSoli, getSolis, getUserDb, getUsersClass }
