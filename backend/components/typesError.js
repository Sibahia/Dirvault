class typeError {
    name = 'Error'
    msg;

    constructor (message) {
        this.msg = message;

        try {
            throw new Error(this.name)
        } catch {
           throw new Error(`${this.name}: ${this.msg}`)
        }
    }
}

module.exports = { typeError }