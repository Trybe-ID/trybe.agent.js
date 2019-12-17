const bcrypt = require('bcryptjs')

module.exports = {
    accounts: [
        {
            email: 'adam',
            password: bcrypt.hashSync('adam', 8),
            firstName: 'Adam',
            lastName: 'Lemmon',
            roles: ['admin'],
            organizations: {
                default: 'Convergence.tech Inc.'
            },
            recipientLists: {},
            images: ['https://res.cloudinary.com/dadlqfryt/image/upload/v1572813811/convergence-logos/convergence-icon_zk59ej.png']
        },
    ]
}