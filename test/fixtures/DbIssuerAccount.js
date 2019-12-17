const bcrypt = require('bcryptjs')

module.exports = {
    email: 'issuer@gmail.com',
    password: bcrypt.hashSync('hello', 8),
    firstName: 'Adam',
    lastName: 'Lemmon',
    roles: ['issuer'],
    organizations: {
        default: 'Convergence.tech'
    },
    images: [
        'https://res.cloudinary.com/dadlqfryt/image/upload/v1572813811/convergence-logos/convergence-icon_zk59ej.png'
    ]
}