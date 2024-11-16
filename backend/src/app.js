const express = require('express');
const app = express();
const fs = require('fs');

const { newPlayer, newSoli } = require('./db.js');
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

    newSoli(plUser.name, plUser.chapter)
    
})

app.get('/solic', (req, res) => {
    
})