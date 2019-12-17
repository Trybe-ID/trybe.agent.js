const { API_URL, ACCOUNTS_COLLECTION, AUTH_PREFIX } = require('../../src/constants')
const DbIssuerAccount = require('../fixtures/DbIssuerAccount')
const IssuerAccount = require('../fixtures/IssuerAccount')
const { sendRequest } = require('../../src/utils')

async function loginAsIssuer(app) {
    await app.db.start()
    await app.db.conn.collection(ACCOUNTS_COLLECTION).deleteMany()

    // Insert one issuer account 
    await app.db.conn.collection(ACCOUNTS_COLLECTION).insertOne(DbIssuerAccount)

    // Login as the issuer
    const login = {
      email: IssuerAccount.email,
      password: IssuerAccount.password
    }

    const { token } = (await sendRequest(API_URL, `${AUTH_PREFIX}/login/`, 'POST', login)).body

    // Set headers for remaining requests
    const headers = {
      authorization: `Bearer ${token}`
    }

    return headers
}

module.exports = loginAsIssuer