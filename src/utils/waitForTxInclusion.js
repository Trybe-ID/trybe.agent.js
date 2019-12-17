const log = require('../logger');
const { getWeb3 } = require('../utils')

async function waitForTxInclusion(txHash, web3, maxRetries=1000, pollingInterval=2000) {
    if (web3 === undefined) {
        web3 = await getWeb3()
    }

    let retry = 0;  	

    let rawReceipt = await web3.eth.getTransaction(txHash);	
    
    return new Promise((resolve, reject) => {
        // Try maxRetries times to get tx	
        const txInterval = setInterval(async () => {
            log.info({ module: 'eth-service.assets' }, `Waiting for tx: ${txHash}... ${retry}`);
        
            if (rawReceipt) {
                if (rawReceipt.blockNumber) {
                    log.info({ module: 'eth-service.assets' }, `Transaction was found in block ${rawReceipt.blockNumber}!`);
                    clearInterval(txInterval);	
                    resolve(rawReceipt)
                }
            }
        
            // Ensure not blocked, will break after max	
            retry += 1;	
        
            rawReceipt = await web3.eth.getTransactionReceipt(txHash);	

            if (retry === maxRetries) {	
                clearInterval(txInterval);	
                throw new errors.NotFoundError(`${txHash} could not be found after ${maxRetries} retries.`);	
            }	
        }, pollingInterval);	
    });
}

module.exports = waitForTxInclusion