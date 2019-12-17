module.exports = {
    genesisTxsTestnet:  require('./genesis-txs-testnet'),

    NETWORK: process.env.NETWORK || 'builder',
    POOL_NAME: process.env.POOL_NAME || 'builder',

    STEWARD_WALLET_CONFIG: process.env.STEWARD_WALLET_CONFIG || { 'id': 'testnet_wallet' },
    STEWARD_WALLET_CREDENTIALS: process.env.STEWARD_WALLET_CREDENTIALS || {'key': 'yJqNGiE32FzNgmWB3mKzSNOTZasvESwm'},
    STEWARD_DID_SEED: process.env.STEWARD_DID_SEED || 'l18vovhsR8B8F5VZxzFRhC2xQ4y38CPV',
    
    ENDORSER_DID: process.env.ENDORSER_DID || 'U9A7SsgZXNpHpwjnw42X6n',
    ENDORSER_VERKEY: process.env.ENDORSER_VERKEY || 'FnyD7YqAjMcR4w5KNNb7xceFN5FdrQhjdhWMEJGsEqqF',

    ISSUER_DID: process.env.ISSUER_DID || '4bt5ph95QkNmvx6HTDZFwM',
    ISSUER_KEY: process.env.ISSUER_KEY || '2xr8fNoVFPJW7NMiyYY22PGRPwfN9y7iD2p4MbYYDdTV',

    IMPACT_SERIES_SCHEMA: process.env.IMPACT_SERIES_SCHEMA || { ver: '1.0',
        id: '4bt5ph95QkNmvx6HTDZFwM:2:BLG Impact Series 1.0:1.0',
        name: 'BLG Impact Series 1.0',
        version: '1.0',
        attrNames: [ 'Transcript', 'last_name', 'email', 'first_name' ],
        seqNo: null 
    },
    IMPACT_SERIES_CRED_DEF_ID: process.env.IMPACT_SERIES_CRED_DEF_ID || '4bt5ph95QkNmvx6HTDZFwM:3:CL:186:TAG1',

    // CONNECTIONS
    CONNECTION_INVITATION_URL: 'http://connect-with.trybe.id', 
    AGENT_SERVICE_ENDPOINT: 'https://trybe.staging.convergence.tech/agent/',
    AGENT_CONNECTION_LABEL: 'Trybe.ID',
    AGENT_CONNECTION_IMAGE_URL: 'https://trybe.id/icon',
    CONNECTION_INVITATION_TYPE: 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation'
}