const corsMiddleware = require('restify-cors-middleware')
const restify = require('restify')
const fs = require('fs')
const path = require('path')

const log = require('./logger.js')
const { getMethodAPI, getIP } = require('./utils')
const { 
  ACCOUNTS_PREFIX,
  AUTH_PREFIX,
  ISSUER_PREFIX,
  AGENT_PREFIX,
  PUBLIC_PREFIX,
  ORGANIZATIONS_PREFIX,
  HTTPS,
  DOMAIN 
} = require('./constants')
const { authMiddleware } = require('./auth')

const db = require('./db/mongo')
// const indyAgent = require('./indyAgent')

const auth = require('./routes/auth')
// const indy = require('./routes/indy')
const public = require('./routes/public')

const serverOptions = {
  log,
  version: '1.0.0',
  versions: ['1.0.0'],
  name: 'trybe.agent',
}

if (HTTPS) {
  serverOptions.certificate = fs.readFileSync(path.join(__dirname, `https/${DOMAIN}/fullchain.pem`))
  serverOptions.key = fs.readFileSync(path.join(__dirname, `https/${DOMAIN}/key.pem`))
}

// server start
const server = restify.createServer(serverOptions)

const cors = corsMiddleware({
  origins: ['*'],
})

server.opts(/.*/, function (req,res,next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"))
  res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"))
  res.send(200)
  return next()
})

server.use(restify.plugins.bodyParser({ mapParams: false }))
server.use(cors.actual)
server.use(authMiddleware)

// log every request
server.pre((req, res, next) => {
  req.log.info({ req, module: 'api' }, `\nNew request from ${getIP(req)} on ${getMethodAPI(req)}`)
  next()
})

// log every error
server.on('restifyError', (req, res, err, callback) => {
  log.error({ module: 'api', err, version: req.headers['accept-version'] }, `Exception from ${getIP(req)} while requesting ${getMethodAPI(req)}`)
  return callback()
})

auth.applyRoutes(server, AUTH_PREFIX)
// indy.applyRoutes(server, AGENT_PREFIX)
public.applyRoutes(server, PUBLIC_PREFIX)

server.db = new db()
server.db.start()
// server.indyAgent = new indyAgent()  
// server.indyAgent.start()

module.exports = server
