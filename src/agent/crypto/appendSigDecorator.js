const indy = require('indy-sdk')
// const ed25519sha256_single = require('./ed25519sha256_single')

/**
 * Signature Decorator as per: https://github.com/hyperledger/aries-rfcs/blob/master/features/0234-signature-decorator/README.md 
 * Will append ~sig to the key name
 * @param {Object} msg JSON Object
 * @param {String} fieldToSign The field of the message to sign
 * @param {String} publicKey Base58 verKey
 */
async function appendSigDecorator(wallet, msg, fieldToSign, publicKey) {
    /**
     * def sign_message_field(field_value: Dict, signer: str, secret: bytes) -> Dict:
    """ Sign a field of a message and return the value of a signature decorator.
    """
    timestamp_bytes = struct.pack(">Q", int(time.time()))
    sig_data_bytes = timestamp_bytes + json.dumps(field_value).encode('ascii')
    sig_data = base64.urlsafe_b64encode(sig_data_bytes).decode('ascii')

    signature_bytes = nacl.bindings.crypto_sign(
        sig_data_bytes,
        secret
    )[:nacl.bindings.crypto_sign_BYTES]
    signature = base64.urlsafe_b64encode(signature_bytes).decode('ascii')

    return {
        "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec"
                 "/signature/1.0/ed25519Sha512_single",
        "signer": signer,
        "sig_data": sig_data,
        "signature": signature
    }
     */
    const dataToSign = msg[fieldToSign]
    const dataToSignBytes = Buffer.from(JSON.stringify(dataToSign), 'base64')
    const dataToSignBase64 = dataToSignBytes.toString('base64')

    // sign sign sign
    // const signatureBytes = Buffer.from(await ed25519sha256_single(dataToSignBase64, publicKey, secretKey))
    const signatureBytes = await indy.cryptoSign(wallet, publicKey, dataToSignBytes)
    const signatureBase64 = signatureBytes.toString('base64')

    // Build up the decorated body
    const decoratedKey = `${fieldToSign}~sig`
    const type = "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/signature/1.0/ed25519Sha512_single"
    const sig_data = dataToSignBase64
    const signature = signatureBase64
    const signer = publicKey

    // This the new field data
    const newField = { 
        "@type": type, 
        sig_data, 
        signature, 
        signer
    }

    // Replace the field with the decorated one
    delete msg[fieldToSign]
    msg[decoratedKey] = newField

    return msg
}

module.exports = appendSigDecorator