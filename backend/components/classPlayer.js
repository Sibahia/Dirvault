const { typeError } = require("./typesError");

class player {
    name;
    chapter;
    xp = 0;

    constructor(playerName, playerChapter) {
        this.name = playerName;
        this.chapter = playerChapter;

        if (this.name == undefined || this.name == "") { new typeError('Nombre está vacío') }
        if (this.chapter == undefined || this.chapter == "") { new typeError('Clase está vacía') }
    }
}

module.exports = { player }