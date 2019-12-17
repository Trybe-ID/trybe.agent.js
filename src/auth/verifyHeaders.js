const errors = require('restify-errors')


function verifyHeaders(headers) {
    const authHeader = headers.authorization

    if (authHeader === undefined) {
        throw new errors.ForbiddenError('No authorization header.')
    }

    const headerContents = authHeader.split(' ')  // should result in [Bearer, token] 
    const [type, token] = headerContents

    if (token === 'undefined') {
        throw new errors.ForbiddenError('No token in header.')
    } else if (type !== 'Bearer') {
        throw new errors.ForbiddenError('No "Bearer" token in header.')
    }

    return token
}
  
module.exports = verifyHeaders