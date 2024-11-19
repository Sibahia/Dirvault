const express = require('express');
const app = express();
const fs = require('fs');

const { newPlayer, newSoli, getSolis, getUserDb } = require('./db.js');
const { validateUser } = require('../components/validations.js')
const { player } = require('../components/classPlayer.js');
const { error } = require('console');

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
        res.send('user saved')
    } catch (error) {
        res.status(400).send(`${error.name}: ${error.message}`)
    }
    
})

app.get('/users', (req, res) => {
    res.render()
})

app.get('/solic', (req, res) => {
    getSolis()
    .then(data => res.send(data))
    .catch(error => res.send(error.message))
})

app.use('/users/name/:name', (req, res) => {
    if (!isNaN(req.params.name)) {
        res.send('not a name')
    } else {
        getUserDb(req.params.name)
        .then(data => res.send(data))
        .catch(error => res.send(error))
    }
})

app.use('/users/id/:id', (req, res) => {
    if (isNaN(req.params.id)) {
        res.send('not a id')
    } else {
        getUserDb(req.params.id)
        .then(data => res.send(data))
        .catch(error => res.send(error))
    }
})

app.get('*', (req, res) => {
    res.status(404).send('route no exists')
})