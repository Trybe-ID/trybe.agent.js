const uuid = require('uuid')
const { AGENT_SERVICE_ENDPOINT } = require('../config')

/**
 * 
 * @param {String} did Did to use for this connection
 * @param {String} thid Thread ID, pulled from @id of the connection request that initiatied this response
 * @param {String} publicKeyBase58 The new verKey for this agent, base58 encoded
 */
async function buildConnectionResponse(did, thid, publicKeyBase58) {
    const recipientKeys = [publicKeyBase58]
    const connection = await buildConnection(did, recipientKeys, publicKeyBase58)

    return {
        "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/response",
        "@id": uuid(),
        "~thread": { thid },
        connection,
    }
}

async function buildConnection(did, recipientKeys, publicKeyBase58, serviceEndpoint=AGENT_SERVICE_ENDPOINT, routingKeys=[]) {
    return { 
        DID: did,
        DIDDoc: { 
            '@context': 'https://w3id.org/did/v1',
            publicKey: [  
                { 
                    id: `${did}#keys-1`,
                    type: 'Ed25519VerificationKey2018',
                    controller: did,
                    publicKeyBase58
                }
            ],
            service: [ 
                { 
                    id: `${did};indy`,
                    type: 'IndyAgent',
                    recipientKeys,
                    routingKeys,
                    serviceEndpoint 
                }
            ] 
        } 
    }
}

module.exports = buildConnectionResponse