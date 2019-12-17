const indy = require('indy-sdk')
const appendTaaAcceptance = require('./appendTaaAcceptance')

async function sendNymRequest(poolHandle, wallet, senderDid, newDid, newKey, alias=null, role='TRUST_ANCHOR') {
    const nymRequest = await indy.buildNymRequest(senderDid, newDid, newKey, alias, role);
    const wrappedRequest = await appendTaaAcceptance(nymRequest)
    const res = await indy.signAndSubmitRequest(poolHandle, wallet, senderDid, wrappedRequest)
    return res
}

module.exports = sendNymRequest