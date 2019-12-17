module.exports = {
  // DEPLOYZZZZZ 
  DB_URL: process.env.DB_URL || null,
  DB_NAME: process.env.DB_NAME || 'dev',
  DEPLOYED_ENV: process.env.DEPLOYED_ENV || '',

  // GENERAL API
  SEND_EMAIL: process.env.SEND_EMAIL || false,

  HTTPS: process.env.HTTPS || false,
  DOMAIN: process.env.DOMAIN || 'trybe.staging.convergence.tech',

  SERVER_PORT: process.env.SERVER_PORT || 3002,
  THREAD_COUNT: process.env.THREAD_COUNT || 1,
  API_URL: process.env.API_URL || 'http://localhost:3002',
  SERVICE_PREFIX: 'certificates',

  // ETH
  ETH_NETWORK: process.env.ETH_NETWORK || 'ropsten',
  ROPSTEN_ETH_TX: process.env.ROPSTEN_ETH_TX || false,
  ETH_TX_URL: process.env.MAINNET ? 'https://ropsten.etherscan.io/tx' : 'https://ropsten.etherscan.io/tx',
  CERTIFICATE_STORE: '0x733a6F54869De9dCEA8CEEb4650BDa651E285e94',
  ADMIN_ADDRESS: '0x18d1658B68803F5cB855d70793596F36b6cc6Fc9',
  INFURA_ROPSTEN: 'INFURA_ROPSTEN',
  INFURA_PROJECT_ID: '439db2f1e8384996834cdb5a99a13829',
  INFURA_URL: 'wss://ropsten.infura.io/ws/v3/',
  PRIVATE_KEY: '6D71DB5374F3AA9990D5C12CCC1EB5DE1720943C45D600C7CC3F414DFD983DCD',  // MOVE INTO ENV!!

  // DB  - TODO store that password somewhere more secure??  pull from env then build in the mongo file?
  // MONGO DB
  ACCOUNTS_COLLECTION: 'accounts',
  ORGANIZATIONS_COLLECTION: 'organizations',
  ISSUED_CERTIFICATES_COLLECTION: 'issued-certificates',
  CREDENTIAL_DEFINITIONS_COLLECTION: 'credential-definitions',
  CONTACTS_COLLECTION: 'contacts',
  CONTACT_KEYS: ['firstName', 'lastName', 'contact', 'type' ],

  // DEPLOY
  PUBLIC_CERT_URL: 'https://vc.convergence.tech?',
  PUBLIC_VERIFICATION_PAGE: 'https://vc.convergence.tech',
  
  // OPERN CERTS
  OPENCERT_EXTENSION: '.opencert',
  COURESE_PREFIX: 'completed-courses',
  
  // ROUTES
  ISSUER_PREFIX: 'issuer',
  AGENT_PREFIX: 'agent',
  AUTH_PREFIX: 'auth',
  ACCOUNTS_PREFIX: 'accounts',
  ORGANIZATIONS_PREFIX: 'organizations',
  PUBLIC_PREFIX: 'public',
  PUBLIC_CERT_ROUTE: 'public-url',
  
  // ROLES
  ADMIN_ROLE: 'admin',

  // IMAGES
  DEFAULT_ISSUER_IMAGE: 'https://res.cloudinary.com/dadlqfryt/image/upload/v1571451072/convergence-logos/Convergence_Logo_Final-01_tq5wtd.png',
  DEFAULT_CREDENTIAL_IMAGE: 'https://trybe.id/icon',

  // AUTH
  UNPROTECTED_ROUTES: [
    { url: '/auth/login/', methods: ['POST']  },
    { url: `/agent/createConnectionInvitation/`, methods: ['POST']  },
    { url: `/agent/`, methods: ['POST']  },
    { url: /^\/public\/.*/, methods: ['GET']  }
  ],
  LINKEDIN_CLIENT_ID: '86qkwozh6kkok8',
  JWT: {
    'priv': `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAyVTQ9QxfutaYXKBbYfZbH2vhIWoIPEjAFSbsy1PZoIcclUQR
hJ8t2m7v47M8eEyYd7EvXTNdoN6CDs0DoNC9KESATZV5SUVr7sk9pOcMrm0VryAd
h7hQbbHWqyKmOehCt1JdX7gV2i5XnRb5qYQSyoB8sGdfR4SQ9q1XPRIpBP8RYXCP
WPmwnmtzYjfs+VVMp+ByNWgM8Qvyc3Z13tHKHWfTokbEbJJE0xfFG6CVFZy+T7uq
0UxhkWh8tekaDbfrIYtgC8HRHfRPcqvsN/pkJM0DIU4UNIf2TeLARa+iATNiF5IX
DeAAkIqoQL0tgt6S+8HIEPGiQ3gpGE56DON06QIDAQABAoIBAAvIxyJQwxmwjeJ+
EFs/jD3elqLaDflZWMTkLmAIXGik/+tMvKnCl3B9pdTyHMv9z77RxC/0XbqYy4wK
O/ghv7CnscrYwOyk/5hOdyk7zOY4xFgnzRKwmySQkDwcHxasnZsVWxnLMJxAsigj
vCFL9b2cn6/DnTQWclW996k/ct8z5DzodH/O+JyQl2MvLgjtf1OupbNZcjt4kMRP
GS5em5banlycUtPE0NAcS0QXleHLj5BXOp0AyD+PWfzhWcctiK7p+vmwXv6OVtlu
DIiTTOnsjoMq7skfVzRpjmAesllXBb1evwsrVK7cjYefEsVZ5DzOVLNU5Iug3HCf
RnftUAECgYEA6uWhJ9la1VpiYgEai4F61Rxs/MAQzmWVl0NQhPrczLCdRXfhmeBP
w1a4VkCD7FlZq/UuL4bSnU2JINL/enmrfZfdLdQgjY1VgPNki6v4Da9sqi+D17Wb
w863h/X29cukttFgUQdPO66bwsitoNVDsBqyf2hlFWC+rRPovoFA9WkCgYEA22s2
njRgoV6mTTCgXoZMs8unJ2CTd+BuVP1wDVsHR0VnK7blVlIW9Hop0ZmFK3I41kw3
3LXT6RSmZXsdgAsm3VuWlDVFY6t+JUUGYOfZZVNgUX0J597hf2SwxfJ8cgNHuSEO
glxc/dzHXMgamf8+84RCK3NSGP8xmuI/Wm5JE4ECgYEAmFelVTradlTQSc99b8zh
5SUyahoGzFWF1zyJFDW+zeIdndhKMIoSMRYlJ4tgBAFO7v9snNZL8kk/DlLJ7pzK
ZAICKJ7THfrz4VX5d7xofDexug5m65eVFkETNtKHAJK6mPbiCKs87/AmhQWx1gV6
iNRHv+ns5RiBka6/3A3oG0ECgYEAl+qIO0rqaG++1ozHTArSCl4DUlkkYQhLe56p
OSYASRE9WF/eM0DM0eHPGGahdC42OfE1cCOYH7WDa5mtGB0ggHxMKjsj2tk+kpFS
1D9SHjx24JShCiAfonNVjQfRr6KjwwKnKAzI+Z8ljRCikmLN9A5rPegvPE1by++/
i132TIECgYAiDd+OSokfZYi8mqjIoMI946+Hlb7lisb7CXksM69A+oWJrfkCwOMq
O3tExLbxtd7KZuAg1xH2thimIeT6tuCbCSAFGzr4EWCe7iavVzevHr98ivPLYXte
dyWl3YlvqO+SUuieGvHISlekblMO/4tcUscmKmo+FgkMroBsePcdEA==
-----END RSA PRIVATE KEY-----`, // TODO update me this is a public insecure key!!!
    'algorithm': 'HS256',
    'expiresIn': '150m'   // TODO revert back to 15m for prod and add refresh
  },
};
