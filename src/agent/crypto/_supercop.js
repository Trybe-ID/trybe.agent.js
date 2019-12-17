const supercop = require('supercop.wasm')

// Promisify the sync ready function required
supercop.promisifyReady = () => {
    return new Promise((resolve, reject) => {
        supercop.ready(() => resolve())
    })
}

module.exports = supercop
