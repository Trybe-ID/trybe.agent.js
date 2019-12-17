const indy = require('indy-sdk');
const util = require('../util');


async function connectToPool(network, poolName) {
    const genesis_txn = await util.getPoolGenesisTxnPath(network, poolName);
    const poolConfig = {  genesis_txn }

    try {
        await indy.createPoolLedgerConfig(poolName, poolConfig);
    } catch(e) {
        if(e.message !== "PoolLedgerConfigAlreadyExistsError") {
            throw e;
        }
    }

    const poolHandle = await indy.openPoolLedger(poolName);
    return poolHandle
}

module.exports = connectToPool