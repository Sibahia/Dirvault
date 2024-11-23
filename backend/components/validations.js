const { newSoli } = require('../src/db');
const { Validation, ConnectionError } = require('./typesError');

const validateUser = ({ name, chapter } = {}) => {
    if (!name) throw new Validation('name is required')
    if (!chapter) throw new Validation('chapter is required')

    if (name.length < 3) throw new Validation('name must have at least 3 characters')

    try {
        newSoli(name, chapter)
    } catch (e) {
        throw new ConnectionError('database is not available')
    }
}

const valideUserDb = (type, value) => {
    let userId = type == 'id';
    let userName = type == 'name';

    if (userId && isNaN(value) || userName && !isNaN(value)) {
        let data = userId ? 'id' : 'name';
        throw new Validation(`not a ${data}`)
    }

}

const valideUserChapter = (chapter) => {
    const nameChapters = ['Mague', 'Rogue', 'Paladin']

    if (!isNaN(chapter)) throw new Validation('not a chapter, chapters: [Paladin, Rogue, Mague]')
    
    const checkChapters = (chapters) => chapters == chapter;

    let isChapter = nameChapters.some(checkChapters)

    if (!isChapter) throw new Validation('not exist chapter')
}

module.exports = { validateUser, valideUserDb, valideUserChapter }