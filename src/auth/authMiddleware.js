const unless = require('express-unless')
const { UNPROTECTED_ROUTES, JWT } = require('../constants')
const verifyHeaders = require('./verifyHeaders')
const verifyJwtToken = require('./verifyJwtToken')

async function authMiddleware(req, res, next) {
    try {
        const token = await verifyHeaders(req.headers)
        const account = await verifyJwtToken(token, JWT.priv, JWT.algorithm)
        
        req.account = account
        
        return next()
    } catch (err) {
        return next(err)
    }
}
  
authMiddleware.unless = unless

// Export with routes to exclude from auth
module.exports = authMiddleware.unless({ path: UNPROTECTED_ROUTES })