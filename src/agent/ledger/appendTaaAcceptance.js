const indy = require('indy-sdk')


async function appendTaaAcceptance(request) {
    const appendedRequest = await indy.appendTxnAuthorAgreementAcceptanceToRequest(
        requestJson=request,
        text=null,
        version=null,
        taaDigest='920e68ff43bf157d657e35fca291baa00f8b14c395cddf6e4b4e156391baf7cd',
        accMechType='click_agreement',
        timeOfAcceptance=1568679120
    )
    return appendedRequest
}

module.exports = appendTaaAcceptance