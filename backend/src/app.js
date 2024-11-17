const express = require('express');
const app = express();
const fs = require('fs');

const { newPlayer, newSoli, getSolis } = require('./db.js');
const { validateUser } = require('../components/validations.js')
const { player } = require('../components/classPlayer.js');

let PATH_JSON = './database/solicitudes.json';

const port = 5500;

app.use(express.json())

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

app.get('/', (req, res) => {
    res.send('Hello')
})

app.post('/reg', (req, res) => {
    const { plName, plClass } =  req.body;

    // if (!plName || !plClass) { return console.log('Error Params') }

    const plUser = new player(plName, plClass)

    try {
        validateUser(plUser)
    } catch (error) {
        res.status(400).send(`${error.name}: ${error.message}`)
    }
    
})

app.get('/solic', (req, res) => {
    getSolis()
    .then(data => res.send(data))
    .catch(error => res.send(error.message))
})