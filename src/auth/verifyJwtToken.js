const jwt = require('jsonwebtoken')


async function verifyJwtToken(token, priv, algorithm) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, priv, { algorithm }, (err, user) => {
            if (err) {  
                reject(err) 
            } else {
                resolve(user)
            }
        })
    })
}

module.exports = verifyJwtToken