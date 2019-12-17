const { Router } = require('restify-router');
const log = require('../logger');
const errors = require('restify-errors')

const router = new Router();

async function createConnectionInvitation(req, res, next) {
  try {
    const connectionInvitation = await this.indyAgent.createConnectionInvitation()
    log.info({ module: 'indy' }, `Successfully created invitation ${connectionInvitation.invitation['@id']}...`);
    res.send(201, connectionInvitation);
    return next();
  } catch (err) {
    return next(err);
  }
}

async function serviceEndpoint(req, res, next) {
  try {
    log.info({ module: 'indy' }, `SERVICE ENDPOINT`)

    // Somehow detect why the endpoint was hit??
    // This was a connectionRequest
    const jwe = req.body.toString()

    log.info({ module: 'indy' }, `${jwe}`)

    const connectionResponse = await this.indyAgent.receiveConnectionRequest(jwe)

    log.info({ module: 'indy' }, `${connectionResponse}`)

    log.info({ module: 'indy' }, `Successfully accepted connection response...`)
    res.send(201, connectionResponse.toString())
    return next()
  } catch (err) {
    return next(err)
  }
}

router.post({ path: `/createConnectionInvitation/`, version: '1.0.0' }, createConnectionInvitation);
router.post({ path: `/`, version: '1.0.0' }, serviceEndpoint);

module.exports = router;

