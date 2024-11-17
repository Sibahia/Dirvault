const { typeError } = require("./typesError");

class player {
    name;
    chapter;
    xp = 0;

    constructor(playerName, playerChapter) {
        this.name = playerName;
        this.chapter = playerChapter;
    }
}

module.exports = { player }