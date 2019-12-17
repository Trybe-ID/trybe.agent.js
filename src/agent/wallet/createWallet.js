const indy = require('indy-sdk');


async function createWallet(config, credentials) {
    try {
        await indy.createWallet(config, credentials)
    } catch(e) {
        
        if(e.message !== "WalletAlreadyExistsError") {
            throw e;
        }
    }

    const wallet = await indy.openWallet(config, credentials);
    return wallet 
}

module.exports = createWallet