const { assert } = require('chai')
const app = require('../src/server')
const { sendRequest } = require('../src/utils')
const { verifyJwtToken } = require('../src/auth')
const { API_URL, SERVER_PORT, ACCOUNTS_PREFIX, AUTH_PREFIX, JWT } = require('../src/constants')
const loginAsAdmin = require('./utils/loginAsAdmin')

describe('/auth/login POST', () => {
  before(async () => {
    server = app.listen(SERVER_PORT, () => {})
    headers = await loginAsAdmin(app)
  })

  after(() => {
    server.close()
  })

  it('should successfully log a user in', async () => {
    let req = { 
      email: `adam@convergence.tech${Math.random()*1000}`,  // Some randomness to not conflict with other test cases
      password: 'testpass'
    }

    // First add the user you wish to login
    let res = await sendRequest(API_URL, `${ACCOUNTS_PREFIX}/register/`, 'POST', req, headers)
    let { statusCode } = res
    assert.strictEqual(statusCode, 201, 'statusCode incorrect')

    res = await sendRequest(API_URL, `${AUTH_PREFIX}/login/`, 'POST', req)
    assert.strictEqual(res.statusCode, 200, 'statusCode incorrect')
  
    // Decode the token and validate
    const isVerified = await verifyJwtToken(res.body.token, JWT.priv, JWT.algorithm)
    assert.isNotNull(isVerified, 'token incorrect')
    assert.strictEqual(isVerified.email, req.email, 'token account incorrect')
  })
})
