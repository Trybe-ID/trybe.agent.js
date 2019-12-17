const jwt = require('jsonwebtoken')
const { expiresIn, priv, algorithm } = require('../constants').JWT


const getJwt = async account => {
    return new Promise((resolve, reject) => {
        try {
            delete account.password  // let's get this outta the token
            const token = jwt.sign(account, priv, { algorithm, expiresIn })
            resolve(token)
        } catch (err) {
            reject(err)
        }
    })
}

module.exports = getJwt