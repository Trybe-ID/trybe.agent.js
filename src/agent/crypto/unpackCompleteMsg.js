const indy = require('indy-sdk')

async function unpackCompleteMsg(wallet, msgBuffer, routingKeys, recipientKeys, senderVerKey) {
    let routingPackedMsgBuffer

    // Routing packing first
    if (routingKeys) {
        routingPackedMsgBuffer = await indy.packMessage(wallet, msgBuffer, routingKeys, senderVerKey)
    } else {
        routingPackedMsgBuffer = msgBuffer
    }

    return await indy.packMessage(wallet, routingPackedMsgBuffer, recipientKeys, senderVerKey)
}

module.exports = unpackCompleteMsg