const express = require('express');
const app = express();

const { newPlayer } = require('./db.js');
const { player } = require('../components/classPlayer.js');

const port = 5500;

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})

app.get('/reg', (req, res) => {
    const { plName, plClass } =  req.body;

    const plUser = new player(plName, plClass)

    newPlayer(plUser.name, plUser.chapter, plUser.xp)
    
})