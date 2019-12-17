const log = require('../logger');


async function get(req, res, next, collection, query, db) {
    try {
        const items = await (await db.get(collection, query)).toArray()
        log.info({ module: 'cert-service.issuer' }, `Successfully got ${items.length} items...`);
        res.send(200, items);
        return next();
    } catch (err) {
        return next(err);
    }
}


module.exports = get