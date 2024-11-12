const sql = require('sqlite3').verbose();
const db = new sql.Database('../backend/database/usersInfo.db', (err) => {
    if (err) { console.log(err) }
});

let PROPS = 

db.serialize(() => {
    db.run()
})