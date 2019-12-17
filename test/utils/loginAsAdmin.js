const { API_URL, ACCOUNTS_COLLECTION, AUTH_PREFIX } = require('../../src/constants')
const DbAdminAccount = require('../fixtures/DbAdminAccount')
const AdminAccount = require('../fixtures/AdminAccount')
const { sendRequest } = require('../../src/utils')

async function loginAsAdmin(app) {
    await app.db.start()
    await app.db.conn.collection(ACCOUNTS_COLLECTION).deleteMany()

    // Insert one admin account 
    // Need to register an admin account first
    await app.db.conn.collection(ACCOUNTS_COLLECTION).insertOne(DbAdminAccount)

    // Login as the admin
    const login = {
      email: AdminAccount.email,
      password: AdminAccount.password
    }

    const { token } = (await sendRequest(API_URL, `${AUTH_PREFIX}/login/`, 'POST', login)).body

    // Set headers for remaining requests
    const headers = {
      authorization: `Bearer ${token}`
    }

    return headers
}

module.exports = loginAsAdmin