const { assert } = require('chai')
const app = require('../src/server')
const fs = require('fs')
const path = require('path')
const { sendRequest } = require('../src/utils')
const { API_URL, SERVER_PORT, ACCOUNTS_PREFIX, ACCOUNTS_COLLECTION } = require('../src/constants')
const loginAsAdmin = require('./utils/loginAsAdmin')
const loginAsIssuer = require('./utils/loginAsIssuer')

describe('/accounts/register POST', () => {
  before(async () => {
    server = app.listen(SERVER_PORT, () => {})
    headers = await loginAsAdmin(app)
  })

  after(() => {
    server.close()
  })

  afterEach(async () => {
    await app.db.conn.collection(ACCOUNTS_COLLECTION).deleteMany()
  })

  it('should successfully add a new account', async () => {
    const req = { 
      email: `adam@convergence.tech${Math.floor(Math.random()*1e5)}`,
      password: 'somehash'  
    }

    const res = await sendRequest(API_URL, `${ACCOUNTS_PREFIX}/register/`, 'POST', req, headers)
    
    const { statusCode } = res

    const query = { email: req.email }
    const accounts = await (await app.db.get(ACCOUNTS_COLLECTION, query)).toArray()
    const account = accounts[0]

    assert.strictEqual(statusCode, 201, 'statusCode incorrect')
    assert.strictEqual(account.email, req.email, 'email incorrect')
  })

  it('should throw error that account exists', async () => {
    const req = { 
      email: 'adam@convergence.tech',
      password: 'somehash'  
    }

    await sendRequest(API_URL, `${ACCOUNTS_PREFIX}/register/`, 'POST', req, headers)
    const res = await sendRequest(API_URL, `${ACCOUNTS_PREFIX}/register/`, 'POST', req, headers)
    
    const { statusCode } = res

    assert.strictEqual(statusCode, 409, 'statusCode incorrect')
  })

  it('should throw error that not admin', async () => {
    const req = { 
      email: 'adam@convergence.tech',
      password: 'somehash'  
    }

    const headers = await loginAsIssuer(app)
    const res = await sendRequest(API_URL, `${ACCOUNTS_PREFIX}/register/`, 'POST', req, headers)
    const { statusCode } = res
    assert.strictEqual(statusCode, 403, 'statusCode incorrect')
  })
})
