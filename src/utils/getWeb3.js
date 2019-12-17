const Web3 = require('web3')
const ProviderEngine = require("web3-provider-engine")
const WebsocketSubProvider = require("web3-provider-engine/subproviders/websocket")
const { INFURA_URL, INFURA_PROJECT_ID } = require('../constants')

const getWeb3 = async () => {
  const rpcUrl = `${INFURA_URL}${INFURA_PROJECT_ID}`

  const engine = new ProviderEngine();

  const fetchProvider = new WebsocketSubProvider({ rpcUrl });
  engine.addProvider(fetchProvider);
  engine.start();

  return new Web3(engine);
}

module.exports = getWeb3;
