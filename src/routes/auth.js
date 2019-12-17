const { Router } = require('restify-router');
const log = require('../logger');
const { getJwt } = require('../auth')
const errors = require('restify-errors')
const { authenticateAccount } = require('../auth')

const router = new Router();

async function login(req, res, next) {
  try {
    const account = req.body;

    // Can customize this method to authenticate against other means in future, ie. VCs
    const dbAccount = await authenticateAccount(account, this.db)
    const token = await getJwt(dbAccount)

    log.info({ module: 'cert-service.auth' }, `Successfully logged ${account.email} in...`);
    res.send(200, { token, dbAccount });
    return next();
  } catch (err) {
    return next(err);
  }
}


router.post({ path: `/login/`, version: '1.0.0' }, login);

module.exports = router;

