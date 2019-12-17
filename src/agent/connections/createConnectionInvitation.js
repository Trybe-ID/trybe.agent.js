const uuid = require('uuid')
const { 
    AGENT_CONNECTION_IMAGE_URL,
    AGENT_CONNECTION_LABEL,
    AGENT_SERVICE_ENDPOINT,
    CONNECTION_INVITATION_TYPE,
    CONNECTION_INVITATION_URL,
} = require('../config')


async function createConnectionInvitation(
    recipientKeys, 
    label=AGENT_CONNECTION_LABEL, 
    serviceEndpoint=AGENT_SERVICE_ENDPOINT,
    imageUrl=AGENT_CONNECTION_IMAGE_URL
) {
    const invitation = {
        "@type": CONNECTION_INVITATION_TYPE,
        "@id": uuid(),
        recipientKeys,
        serviceEndpoint,
        label,
        imageUrl,
    }   

    const invitationUrl = toUrl(CONNECTION_INVITATION_URL, JSON.stringify(invitation))

    const connectionInvitation = {
        "connection_id": uuid(),
        invitation,
        "invitation_url": invitationUrl
    }

    return connectionInvitation
}

function toUrl(baseUrl, invitationJSON) {
    const cAscii = Buffer.from(invitationJSON, "ascii");
    const cBytes = cAscii.toString('base64')
    const url = `${baseUrl}?c_i=${cBytes.toString()}`
    return url
}


module.exports = createConnectionInvitation