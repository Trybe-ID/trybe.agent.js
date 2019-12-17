const { DEPLOYED_ENV, ACCOUNTS_COLLECTION } = require('../constants')
const seedDev = require('./seeds/seed.dev')
const seedStaging = require('./seeds/seed.staging')

async function seed(conn) {
    let accounts 

    if (DEPLOYED_ENV==='staging') {
        ({ accounts } = seedStaging)
    } else if (DEPLOYED_ENV==='prod') {
        return
    } else {
        ({ accounts } = seedDev)
    }

    const dbAccounts = await conn.collection(ACCOUNTS_COLLECTION).find({}).toArray()

    // Only seed when empty
    if (dbAccounts.length === 0) {
        // await conn.collection(ACCOUNTS_COLLECTION).insertMany(accounts)
        await conn.collection(ACCOUNTS_COLLECTION).insertOne(accounts[0])
    }
}

module.exports = seed