# Trybe.ID Micro-credentials

[API Docs]()

## Deploy

### Prod

*All prod deployment via docker*

* Build the image: `yarn build`
* Push the image to docker hub: `yarn push`
* scp `docker-compose.prod.yml` to the box you wish to deploy to and run `docker-compose up`

# APP

## Quick Start

* Start dev server: `yarn dev`

* Start prod server locally: `yarn start`

### Local - Dev

* to test prod against with use now to deploy: `yarn deploy`
* to deploy local with serve: `yarn deploy-local`   

## DB Setup
* Staging:
    `mongo --host 169.48.26.234 --port 27017 -u trybe-admin -p Ht9uLb12Wz^R686Wo`
    `mongo --host 169.48.26.234 --port 27017 -u api-service -p Ua0fTru6rKm9eYx`

* Install mongodb
* connection mongo --host <ip> --port <port> -u <username> -p <password>
* use admin
* Create an admin user
db.createUser(
 {
   user: "trybe-admin",
   pwd: "Ht9uLb12Wz^R686Wo",
   roles: [ 
       { role: "userAdminAnyDatabase", db: "admin" } 
       { role: "dbOwner", db: "trybe-db-staging" } 
    ]
 }
)

db.updateUser("trybe-admin",
 {
   roles: [ 
       { role: "userAdminAnyDatabase", db: "admin" },
       { role: "dbOwner", db: "trybe-db-staging" } ,
       { role: "dbOwner", db: "test" } 
    ]
 }
)

* Login as the admin user
mongo --port 27017 --username <trybe-admin> --password <pass>
mongo --host 169.48.26.234 --port 27017 -u trybe-admin -p Ht9uLb12Wz^R686Wo


* Create an application user
db.createUser(
  {
    user: "api-service",
    pwd: "Ua0fTru6rKm9eYx",
    roles: [ 
        { role: "readWrite", db: "trybe-db-staging" }
    ]
  }
)


db.updateUser('api-service',
  {
    roles: [ 
        { role: "readWrite", db: "trybe-db-staging" },
        "readWriteAnyDatabase",
    ]
  }
)

readWriteAnyDatabase