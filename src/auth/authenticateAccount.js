const bcrypt = require('bcryptjs');
const errors = require('restify-errors')
const { ACCOUNTS_COLLECTION } = require('../constants')


const authenticateAccount = async function(account, db) {
    return new Promise(async (resolve, reject) => {
        try {
            const query = { email: account.email }
            const queryResult = await db.get(ACCOUNTS_COLLECTION, query)
            
            if (await queryResult.count() === 0) {
                throw new errors.InvalidArgumentError(`${email} does not exist.`)
            } else if (await queryResult.count() > 1) {
                throw new errors.InvalidContentError(`something went wrong... ${email} exists more than once.`)
            }

            const dbAccount = (await queryResult.toArray())[0]
            const passwordIsValid = bcrypt.compareSync(account.password, dbAccount.password);

            if (passwordIsValid) { 
                delete dbAccount.password
                resolve(dbAccount)
            } else {
                throw new errors.InvalidCredentialsError('Password does not match.');
            }
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = authenticateAccount