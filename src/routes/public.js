const { Router } = require('restify-router');
const log = require('../logger');
const { getJwt } = require('../auth')
const errors = require('restify-errors')
const { ISSUED_CERTIFICATES_COLLECTION } = require('../constants')

const router = new Router();

async function getCertById(req, res, next) {
  try {
    const { id } = req.params;

    // const cert = await (await this.db.get(ISSUED_CERTIFICATES_COLLECTION, {})).toArray()
    const certs = await (await this.db.get(ISSUED_CERTIFICATES_COLLECTION, { id })).toArray()

    if (certs.length === 0) {
        throw new errors.BadRequestError(`Cert not found with id: ${id}`)
    }

    const cert = certs[0].rawCertificate

    log.info({ module: 'cert-service.public' }, `Successfully retrieved ${id}...`);
    res.send(200, { cert });
    return next();
  } catch (err) {
    return next(err);
  }
}


router.get({ path: `/cert/:id`, version: '1.0.0' }, getCertById);

module.exports = router;

