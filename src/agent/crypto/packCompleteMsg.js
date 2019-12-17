const indy = require('indy-sdk')

/**
 * 
 * @param {Handle} wallet 
 * @param {Buffer} msgBuffer 
 * @param {Base58 String} senderVerKey 
 * @param {Array} recipientKeys 
 * @param {Array} routingKeys 
 */
async function packCompleteMsg(wallet, msgBuffer, senderVerKey, recipientKeys, routingKeys=[]) {
    let packedMsg

    // Routing packing first if not empty
    if (recipientKeys.length) {
        packedMsg = await indy.packMessage(wallet, msgBuffer, recipientKeys, senderVerKey)
        msgBuffer = packedMsg
    }

    return await indy.packMessage(wallet, msgBuffer, routingKeys, senderVerKey)
}

module.exports = packCompleteMsg