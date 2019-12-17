const bcrypt = require('bcryptjs')

module.exports = {
    accounts: [
        {
            email: 'adam@convergence.tech',
            password: bcrypt.hashSync('hello', 8),
            firstName: 'Adam',
            lastName: 'Lemmon',
            roles: ['admin'],
            organizations: {
                default: 'Convergence.tech Inc.'
            },
            recipientLists: {},
            imageList: {
                default: 'https://res.cloudinary.com/dadlqfryt/image/upload/v1572813811/convergence-logos/convergence-icon_zk59ej.png'
            },
        },
    ]
}