const bcrypt = require('bcryptjs')

module.exports = {
    email: 'adamjlemmon@gmail.com',
    password: bcrypt.hashSync('hello', 8),
    firstName: 'Adam',
    lastName: 'Lemmon',
    roles: ['admin'],
    organizations: {
        default: 'Convergence.tech'
    },
    images: [],
}