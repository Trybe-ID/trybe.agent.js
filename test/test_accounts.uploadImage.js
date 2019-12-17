const { assert } = require('chai')
const app = require('../src/server')
const fs = require('fs')
const path = require('path')
const validJwt = fs.readFileSync(path.join(__dirname, './fixtures/valid-jwt.txt'))
const { sendRequest } = require('../src/utils')
const { API_URL, SERVER_PORT, ACCOUNTS_PREFIX, ACCOUNTS_COLLECTION } = require('../src/constants')
const loginAsAdmin = require('./utils/loginAsAdmin')
const AdminAccount = require('./fixtures/AdminAccount')

describe('/accounts/uploadImage POST', () => {
  before(async () => {
    server = app.listen(SERVER_PORT, () => {})
    headers = await loginAsAdmin(app)
  })

  afterEach(async () => {
    await app.db.conn.collection(ACCOUNTS_COLLECTION).deleteMany()
  })

  after(() => {
    server.close()
  })

  it('should successfully upload an image to cloudinary and add the url to the accounts images list', async () => {
    const imgPath = path.join(__dirname, './fixtures/logo.png')
    const file = fs.readFileSync(imgPath)

    const fileBase64 = file.toString('base64')
    const dataUri = `data:image/png;base64,${fileBase64}`

    const res = await sendRequest(API_URL, `${ACCOUNTS_PREFIX}/uploadImage/`, 'PUT', dataUri, headers)

    assert.strictEqual(res.statusCode, 200, 'statusCode incorrect')
    assert.isNotNull(res.body.url, 'url incorrect')

    const accountArray = await (await app.db.get(ACCOUNTS_COLLECTION, { email: AdminAccount.email })).toArray()
    const {images} = accountArray[0]

    assert.strictEqual(images.length, 1, 'Incorrect amount of images objects returned')
    assert(images[0].includes('https'), 'Incorrect url')
  })
})
