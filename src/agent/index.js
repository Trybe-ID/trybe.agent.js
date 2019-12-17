const indy = require('indy-sdk')
const bs58 = require('bs58')

const log = require('../logger.js')
const config = require('./config')
const connections = require('./connections')
const crypto = require('./crypto')
const ledger = require('./ledger')
const wallet = require('./wallet')

const { 
    NETWORK, 
    POOL_NAME,  
    STEWARD_WALLET_CONFIG,
    STEWARD_WALLET_CREDENTIALS,
    STEWARD_DID_SEED,
    ENDORSER_DID,
    ENDORSER_VERKEY,
    ISSUER_DID,
    ISSUER_KEY,
    IMPACT_SERIES_SCHEMA,
    IMPACT_SERIES_CRED_DEF_ID,
    AGENT_SERVICE_ENDPOINT
} = require('./config')

function indyApi() {}

// TODO figure out data storage...
indyApi.prototype.walletStorage = {
    dids: {} // map verKey to did
}

indyApi.prototype.start = async function() {
    await indy.setProtocolVersion(2)

    // ====================
    // INIT POOL AND WALLET
    try {
        this.poolHandle = await ledger.connectToPool(NETWORK, POOL_NAME)
        log.debug({ module: 'indy' }, 
            `Successfully connected to network: ${NETWORK} and pool: ${POOL_NAME}`
        )
    } catch (err) {
      log.error(
          { module: 'indy' }, 
          `Error connecting to pool. \nNetwork Name: ${NETWORK}\nPool Name: ${POOL_NAME}\nError: ${err}`
        )
    }

    try {
        this.wallet = await wallet.createWallet(STEWARD_WALLET_CONFIG, STEWARD_WALLET_CREDENTIALS);
        log.debug({ module: 'indy' }, `Successfully created steward wallet.`)
    } catch (err) {
        log.error(
            { module: 'indy' }, 
            `Error creating steward wallet. \nError: ${err}`
        )
    }
    // ====================

    // =======================
    // Trust Anchor == Issuer
    // const { did, key, res } = await addTrustAnchor(poolHandle, wallet)
    // console.log(did, key, res)
    // =======================

    // =======================
    // Issuer credential schema
    // const req = await sendSchemaRequest(
    //     poolHandle,
    //     wallet,
    //     ISSUER_DID, 
    //     'BLG Impact Series 1.0', 
    //     '1.0',
    //     ['first_name', 'last_name', 'email', 'Transcript']
    // )
    // console.log(req)
    // =======================

    // ======================
    // Credential Definition
    // const res = await sendCredDefRequest(poolHandle, wallet, ISSUER_DID, IMPACT_SERIES_SCHEMA.id, 'TAG1')
    // console.log(res)
    // =======================

    // =======================
    // CREDENTIAL OFFER
    // let transcriptCredOfferJson = await indy.issuerCreateCredentialOffer(wallet, IMPACT_SERIES_CRED_DEF_ID);
    // console.log(transcriptCredOfferJson)

    // const recipientDid = 'Fx3FNwTNGcnjneEMd5xe19'

    // Create wallet for the recipient
    // const aliceWalletConfig = {'id': 'aliceWallet-1234'}
    // const aliceWalletCredentials = {'key': 'alice_key-1234'}
    // const aliceWallet = await wallet.createWallet(aliceWalletConfig, aliceWalletCredentials)
    // // Create a new did to share
    // const [aliceDid, aliceKey] = await indy.createAndStoreMyDid(aliceWallet, {});
    // console.log(aliceDid, aliceKey)

    // // Send a connection request to alice
    // // let connectionRequest = {
    // //     did: fromToDid,
    // //     nonce: 123456789
    // // };

    // // 
    // let fromToVerkey = await indy.keyForDid(poolHandle, aliceWallet, ISSUER_DID);
    // console.log(fromToVerkey)


    // Get Ver key for the specific did to issue to
    // let aliceFaberVerkey = await indy.keyForDid(poolHandle, wallet, recipientDid);
    // console.log(aliceFaberVerkey)

    // Create the credential offer to send out
    // let authcryptedTranscriptCredOffer = await indy.cryptoAuthCrypt(faberWallet, faberAliceKey, aliceFaberVerkey, Buffer.from(JSON.stringify(transcriptCredOfferJson),'utf8'));

    // Send this offer to the recipient!
    // =======================

    return
}

indyApi.prototype.getWallet = async function() {
    if (!this.wallet) {
        this.wallet = await wallet.createWallet(STEWARD_WALLET_CONFIG, STEWARD_WALLET_CREDENTIALS);
    }
    return this.wallet
}

indyApi.prototype.getPool = async function() {
    if (!this.poolHandle)  {
        this.poolHandle = await ledger.connectToPool(NETWORK, POOL_NAME)
    }
    return this.poolHandle
}

/**
 * Create a new did and connection invitation
 */
indyApi.prototype.createConnectionInvitation = async function() {
    const wallet = await this.getWallet()
    const [ did, key ] = await indy.createAndStoreMyDid(wallet, {})

    // TODO sort out proper storage...
    this.walletStorage.dids[key] = did
    return await connections.createConnectionInvitation(recipientKeys=[key])
}

/**
 * An invitee has sent a response to the inviter here from a presented invitation.
 * This is generally called following the presentation of a qr code (the invitation).
 * This request is sent FROM the invitee TO the inviter
 */
indyApi.prototype.receiveConnectionRequest = async function(connectionReq) {
    const wallet = await this.getWallet()

    const connectionReqBuffer = Buffer.from(connectionReq, 'utf8');

    // Unpack connection request
    const unpackedConnectionReqStr  = (await indy.unpackMessage(wallet, connectionReqBuffer)).toString()
    const unpackedConnectionReq     = JSON.parse(unpackedConnectionReqStr)
    
    // This is the message body of the overall request
    const message = JSON.parse(unpackedConnectionReq.message)
    // const { recipient_verkey, sender_verkey } = unpackedConnectionReq

    console.log('message')
    console.log('message')
    console.log(message)

    // Parse key attrs from the message
    // This id will be used to maintain the thread in the reponse
    const connectionReqId = message['@id']
    const { DID, DIDDoc } = message.connection
    
    // Parse required data from the DIDDoc
    // publicKey defines the encryption envelope scheme
    // Service describes how to communicate with the agent service
    const { publicKey, service }            = DIDDoc
    const { recipientKeys, routingKeys }    = service[0]

    // These are the keys we will use for encryption and packing from the invitee
    const inviteeRecipientKeys  = recipientKeys
    const inviteeRoutingKeys    = routingKeys

    // =====================================
    // We are all set in parsing the request ... time to construct the response
    // =====================================

    // Provision new keys for this relationsship
    // New did for this relationship
    const [newInviterDid, newInviterVerkey] = await indy.createAndStoreMyDid(wallet, {})

    // Need to build the data for the new connection block to communicate to the invitee
    const connectionRes = await connections.buildConnectionResponse(newInviterDid, connectionReqId, newInviterVerkey)

    // Sign the connection as per: 
    //    https://github.com/hyperledger/aries-rfcs/blob/master/features/0234-signature-decorator/README.md
    const signedConnectionRes = await crypto.appendSigDecorator(wallet, connectionRes, 'connection', newInviterVerkey)
    const signedConnectionResBytes = Buffer.from(JSON.stringify(signedConnectionRes))

    const sig = signedConnectionRes['connection~sig']

    const verified = await indy.cryptoVerify(
        sig.signer, 
        Buffer.from(sig.sig_data, 'base64'), 
        Buffer.from(sig.signature, 'base64')
    ) 

    console.log(verified)
    console.log(verified)
    console.log(verified)
    console.log(verified)

    // Time to pack the message with the routing and sender keys
    const packingArgs = [wallet, signedConnectionResBytes, newInviterVerkey, inviteeRecipientKeys, inviteeRoutingKeys]
    const packedConnectionRes = await crypto.packCompleteMsg(...packingArgs)
    
    return packedConnectionRes
}

module.exports = indyApi


// const i = new indyApi()

// i.start().then(async () => {
//     const invite = await i.createConnectionInvitation()
//     const msg = '{"protected":"eyJlbmMiOiJ4Y2hhY2hhMjBwb2x5MTMwNV9pZXRmIiwidHlwIjoiSldNLzEuMCIsImFsZyI6IkF1dGhjcnlwdCIsInJlY2lwaWVudHMiOlt7ImVuY3J5cHRlZF9rZXkiOiI3eWExbUtpMTEzVTBPeE5rMFl2NGM0NXQ3VHE5RnB6RDVfLVJReG1icG9ndkxyeW01elpKX1p4Q25OalAzcTRSIiwiaGVhZGVyIjp7ImtpZCI6IjNyQW9FRXRUc0FNZmVxRkhLeTVLZ0tHbU5raWlFRkNYR0g2Y1R1WkVkY2o1IiwiaXYiOiJiS3NCaXBiRVpnVXVMdXZWaXU3aFFLZWNSU0dROUNZWiIsInNlbmRlciI6IkxkN1ZfRjhWNVdObjJRb1JGck0zZjVCUlZ2cEt4cldaLXJmX1lZM0JqVDlkLUtrWE9lLUpwanhseUk1cmF1dHlDVUJSMENkMWpWSHhsUUF1bXJONWZEbFB2UkxZRGxYbFRodHVKb2RYLTdZNkVjSzYxN3VrRVd3d3B2WT0ifX1dfQ==","iv":"88ttmAZakWus6YDU","ciphertext":"kH6p7mQatRj4hXSdwC5jNd0SOE7NLLwSvwrQ2cHgqs1_jwIPrGjjdY_RA2Jt1kQk2bY29bhD-2nKk5ENbVMuizzmX0UzUoXk0fSvGTDUIkwMR7ciQ-NDRBeIEL078zJT0sAwUKOm_FvgWLajWn1XuXZkXkfiZarYyQibEhHRFoFMsbBSExNj-JmTfaZ1fSFCxj_OezByJ_sCK1cYwVcd4HvKaygJ87FU5L8D85Z2Nda9yhfQtBT2yticLUR52gHXVlHyqOYI0uGXGfEPi_BEgqNy9s3tpaSRPiZySVau9tE8V-IzMGqlqH2Xf6Bwy-arTIhtsb7TbaHaOAig6p__zuqYZ40ADtE8KxPIIs1UbiefCZYNQPkZyAM10jalxuKuahhk_LHYLFKiM0gcicv_z8-c-oAeP8_DECUXYFb2hXlO57UCKCoYhH95bx5vloRyDeHRh_e6BgCuxDlV4ssqR8PCzyGu263txoHpDGFr5bHuuuu9twmI5AGABPgZnMARHtzh15nJVyrvF85-1dw_ZrkYYHlGy7WqU2uFiKy03ivqeNmpOSY0OoPdzZdPkUXIQ_QzS-nUvZ8rqPueF60v6G9HaQbX8FoLdNNnPCN6EmukCmSk6Rb3E5ZRjCKPqpNvL97YHE8Uek0_0GzmRDiSqooiG3sUvJvSdgEFQ-uxGpBt3Low9HfKf3YUmvOxgOmImETfic2EO94wQsdym5T8BGjX610O4XKSjjgtn6zlaAYL1rXDo10XjocDbAW66O62dPFAhQBG_SbsUAcV4eDGt4MplmpxLcYWnzkqy_6ncVg2QZ84FeW665bpFBfqiT9mAs4bWPDUDAllw87f0bGu7jL34-XE5JATlavLMZN1y0MM1-TAHwFcRkdwSzUlUx83J106hMwdo60=","tag":"FqVThvBtzRjhQkQ9cayxpQ=="}'
//     const r = await i.receiveConnectionRequest(msg)
//     console.log(r)
// })

