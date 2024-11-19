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

// const valideUserDb = ({ id, name } = {}) => {
//     if (!id) throw new Validation('id is required')
//     if (!name) throw new Validation('name is required')

//     if (name == null) {
//         try {

//         }
//     }
// }

module.exports = { validateUser }