class Validation extends Error {
    constructor (message) {
        this.name = 'Validation';
        this.message = message;
    }
}

class ConnectionError extends Error {
    constructor (message) {
        this.name = 'ConnectionError';
        this.message = message;
    }
}

module.exports = { Validation, ConnectionError }