'use strict'
const axios = require('axios')
const appInfo = require('../package.json')

// Get app information
exports.getAppInfo = async (_, res) => {
  const ipResponse = await axios
    .get('https://api.ipify.org?format=json')
    .catch(console.error)
  const infoMessage =
    `${appInfo.description} is up and running.
    v${appInfo.version}
    ${ipResponse && ipResponse.data.ip}
    ${appInfo.author}`
  res.status(200).send(infoMessage)
}
