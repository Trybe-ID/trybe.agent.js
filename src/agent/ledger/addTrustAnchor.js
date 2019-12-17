const indy = require('indy-sdk')
const sendNymRequest = require('./sendNymRequest')
const { STEWARD_DID_SEED } = require('../config/config')

// Setup a new issuer
async function addTrustAnchor(poolHandle, wallet) {
    const stewardDidInfo = { 'seed': STEWARD_DID_SEED }
    const [stewardDid, _] = await indy.createAndStoreMyDid(wallet, stewardDidInfo);
    
    const [did, key] = await indy.createAndStoreMyDid(wallet, {});
    const res = await sendNymRequest(poolHandle, wallet, stewardDid, did, key, role='TRUST_ANCHOR')

    return { did, key, res }
}

module.exports = addTrustAnchor