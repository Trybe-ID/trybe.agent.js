const supercop = require('./_supercop')

/**
 * ed255519 key gen as per: https://github.com/nazar-pc/supercop.wasm
 * @returns {Uint8Array, Uint8Array} publicKeyBase58 and secretKeyBase58
 */
async function createBase58_ed25519Keys(seed) {
    await supercop.promisifyReady()
    if (!seed) {
        seed = supercop.createSeed()
    }
    const keys = supercop.createKeyPair(seed)
    return { keys }
}

module.exports = createBase58_ed25519Keys
