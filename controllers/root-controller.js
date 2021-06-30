'use strict'
const appInfo = require('../package.json')

// Get app information
exports.getAppInfo = (_, res) => {
  //const ipResponse = await axios.get('https://api.ipify.org?format=json').catch(console.error)
  const infoMessage =
    `${appInfo.description} is up and running.
    v${appInfo.version}`
//    ${ipResponse.data.ip}`
  res.status(200).send(infoMessage)
}