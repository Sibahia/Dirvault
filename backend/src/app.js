const express = require('express');
const app = express();
const fs = require('fs');
const cors = require('cors')

const { newPlayer, newSoli, getSolis, getUserDb, getUsersClass } = require('./db.js');
const { validateUser, valideUserDb, valideUserChapter } = require('../components/validations.js')
const { player } = require('../components/classPlayer.js');
const { error } = require('console');
const { ConnectionError } = require('../components/typesError.js');

let CORS_OPTION = {
    'origin': '*',
    'methods': ['GET', 'POST']
}

const port = 5500;

app.use(express.json())
app.use(cors(CORS_OPTION))

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

app.get('/', (req, res) => {
    res.status(200).send('Hello')
})

app.post('/reg', (req, res) => {
    const { plName, plClass } =  req.body;

    // if (!plName || !plClass) { return console.log('Error Params') }

    const plUser = new player(plName, plClass)

    try {
        validateUser(plUser)
        res.status(201).send('user saved')
    } catch (error) {
        res.status(400).send(`${error.name}: ${error.message}`)
    }
    
})

app.get('/users', (req, res) => {
    res.render()
})

app.get('/solic', (req, res) => {
    getSolis()
    .then(data => res.status(200).send(JSON.stringify(data)))
    .catch(error => res.status(404).send(error.message))
})

app.get('/users/:type/:value', (req, res) => {
    try {
        valideUserDb(req.params.type, req.params.value)

        getUserDb(req.params.value)
        .then(data => res.status(200).send(JSON.stringify(data)))
        .catch(error => res.status(404).send(`${error.name}: ${error.message}`))
    } catch (error) {
        res.status(400).send(`${error.name}: ${error.message}`)
    }
})

app.get('/users/class', (req, res) => {
    let filters = req.query;

    try {
        valideUserChapter(filters.chapter)

        getUsersClass(filters.chapter)
        .then(data => res.status(200).send(JSON.stringify(data)))
        .catch(error => res.status(404).send(JSON.stringify(error)))
    } catch (error) {
        res.status(400).send(JSON.stringify(`${error.name}: ${error.message}`))
    }
    
})

app.use('*', (req, res) => {
    res.status(404).send('route no exists')
})