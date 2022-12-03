const makeStorageClient = require("./makeStorageClient")
const { getFilesFromPath } = require('web3.storage')

module.exports = async function storeFiles() {
  const client = makeStorageClient()
  const files = await getFilesFromPath('../assets/CreditPremium.png')
  const cid = await client.put(files)
  console.log('stored files with cid:', cid)
  return cid
}