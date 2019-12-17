const indy = require('indy-sdk')
const appendTaaAcceptance = require('./appendTaaAcceptance')


async function sendCredDefRequest(poolHandle, wallet, issuerDid, schemaId, tag, signatureType='CL', config='{"support_revocation": false}') {
    // Need to get the schema from the ledger as it will have an associated id once published
    const getSchemaRequest = await indy.buildGetSchemaRequest(issuerDid, schemaId);
    const getSchemaResponse = await indy.submitRequest(poolHandle, getSchemaRequest);
    const [, receivedSchema] = await indy.parseGetSchemaResponse(getSchemaResponse)

    const [, credDefJson] = await indy.issuerCreateAndStoreCredentialDef(
        wallet, 
        issuerDid, 
        receivedSchema, 
        tag, 
        signatureType, 
        config
    );

    const credDefRequest = await indy.buildCredDefRequest(issuerDid, credDefJson)
    const wrappedRequest = await appendTaaAcceptance(credDefRequest)
    const res = await indy.signAndSubmitRequest(poolHandle, wallet, issuerDid, wrappedRequest)

    return res
}

module.exports = sendCredDefRequest