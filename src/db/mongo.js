const { MongoClient } = require('mongodb')
const errors = require('restify-errors')
const { 
    ACCOUNTS_COLLECTION,
    ISSUED_CERTIFICATES_COLLECTION,
    CREDENTIAL_DEFINITIONS_COLLECTION,
    ORGANIZATIONS_COLLECTION,
    DB_URL,
} = require('../constants')
const seed = require('./seed')

function db() {}

// ========= UTILS / INIT =========
db.prototype.start = async function() {
    let mongoUrl

    // Testing against in mem mongo instance
    if (!DB_URL) {
        const { MongoMemoryServer } = require('mongodb-memory-server')
        const mongo = new MongoMemoryServer()
        mongoUrl = await mongo.getConnectionString()
    } else {
        mongoUrl = DB_URL
    }

    const connection = await MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    this.conn = connection.db()
    
    // Now seed with required initial data
    await seed(this.conn)
}

db.prototype.getConnection = async function() {
  if (!this.conn) await this.start()
  return this.conn
}

// ========= PASS IN COLLECTION AND QUERY =========
db.prototype.exists = async function(collection, item) {
    let query
    
    // Query slightly different depending on the , unique id varies
    if (collection === ACCOUNTS_COLLECTION) {
        query = { email: item.email }
    } else if (collection === ISSUED_CERTIFICATES_COLLECTION) {
        query = { id: item.id, issuer: item.issuer }
    } else if (collection === CREDENTIAL_DEFINITIONS_COLLECTION) {
        query = { name: item.name, issuer: item.issuer }
    } else if (collection === ORGANIZATIONS_COLLECTION) {
        query = { name: item.name }
    }

    const count = await (await this.get(collection, query)).count();
    return count > 0;
}

db.prototype.get = async function(collection, query) {
    const conn = await this.getConnection()
    return await conn.collection(collection).find(query);
}

db.prototype.increment = async function(collection, query, increment) {
    const update = { $inc: { recipients: increment }}
    return this.update(collection, query, update)
}

db.prototype.update = async function(collection, query, update, options) {
    const conn = await this.getConnection()
    return await conn.collection(collection).updateOne(query, update, options);
}

db.prototype.insert = async function(collection, item) {
    const conn = await this.getConnection()

    if (await this.exists(collection, item))  {
        throw new errors.InvalidArgumentError(`Item already exists! Collection: ${collection}, ${JSON.stringify(item)} already exists.`)
    }

    const { insertedId } = await conn.collection(collection).insertOne(item);
    return insertedId;
}

db.prototype.getAll = async function(collection) {
  const conn = await this.getConnection()
  return await conn.collection(collection).find({}).toArray();
}

module.exports = db