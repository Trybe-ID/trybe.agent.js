const indy = require('indy-sdk')
const appendTaaAcceptance = require('./appendTaaAcceptance')


async function sendSchemaRequest(poolHandle, wallet, issuerDid, credentialName, tag, attributes) {
    const [id, schema] = await indy.issuerCreateSchema(issuerDid, credentialName, tag, attributes)
    const schemaRequest = await indy.buildSchemaRequest(issuerDid, schema)
    const wrappedRequest = await appendTaaAcceptance(schemaRequest)
    const res = await indy.signAndSubmitRequest(poolHandle, wallet, issuerDid, wrappedRequest)
    return res
}

module.exports = sendSchemaRequest