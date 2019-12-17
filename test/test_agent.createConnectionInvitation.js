const { assert } = require('chai')
const app = require('../src/server')
const { sendRequest } = require('../src/utils')
const { API_URL, SERVER_PORT, AGENT_PREFIX } = require('../src/constants')


describe('/indy/createConnectionInvitation POST', () => {
  before(async () => {
    server = app.listen(SERVER_PORT, () => {})
  })

  after(() => {
    server.close()
  })

  it.skip('should successfully create a connection invitation', async () => {
    const res = await sendRequest(API_URL, `${AGENT_PREFIX}/createConnectionInvitation/`, 'POST')

    const invitation = res.body
    assert.strictEqual(res.statusCode, 201, 'statusCode incorrect')
    assert.isNotNull(invitation.invitation, 'invitation is empty')
    assert.isNotNull(invitation.invitation_url, 'invitation url empty')
  })
})
