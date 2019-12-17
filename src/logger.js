//
// Base logger utilized by all certificate-service modules
//
const bunyan = require('bunyan');
const cluster = require('cluster');
const PrettyStream = require('bunyan-prettystream');
const { PROD } = require('./constants')

const prettyStdOut = new PrettyStream();
prettyStdOut.pipe(process.stdout);

let name = 'api';
const serializers = bunyan.stdSerializers
let streams = [{
  stream: prettyStdOut,
  level: 'debug',
}]

// If a worker thread append id to name
if (cluster.worker) {
  name = `service-${cluster.worker.id}`;
}

// Add logging to disk in PROD
if (PROD) {
  streams.push({
    path: './server.log',
    level: 'debug',
  })
}

// Init the actual logger
const log = bunyan.createLogger({ name, serializers, streams });

// Define at runtime
log.fields.module = undefined;

module.exports = log;