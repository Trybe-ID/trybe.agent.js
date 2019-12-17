const supercop = require('supercop.wasm')

// Promisify the sync ready function required
supercop.promisifyReady = () => {
    return new Promise((resolve, reject) => {
        supercop.ready(() => resolve())
    })
}

/**
 * ed255519 key gen and signature as per: https://github.com/nazar-pc/supercop.wasm
 * @param {String} msg, must JSON.stringify objects etc.
 * @returns {Uint8Array} sig and publicKey
 */
async function ed25519sha256_single(msg, publicKey, secretKey) {
    await supercop.promisifyReady()
    
    const msgBuffer = Buffer.from(msg, 'utf8')
    const signature = supercop.sign(msgBuffer, publicKey, secretKey)
    
    // Sanity check... 
    if (supercop.verify(signature, msgBuffer, publicKey)) {
        return signature
    } else {
        throw new Error(`Could not verify the generated signature...`)
    }
}

module.exports = ed25519sha256_single
