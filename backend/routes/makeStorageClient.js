const { Web3Storage } = require('web3.storage')

function getAccessToken() {
  return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE1ZTQ2N2E3NzNiODg2MEI1ZTRGZDNhQUE1YjQ1ZTk5NzQzNTA4QzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNjQzNTAxNzAsIm5hbWUiOiJDcmVkaWZ5IFByZW1pdW0ifQ.mKdHBo-FwEl0KMiNUysPkkexJoDQBn-iiKyAAvwU7Yc"
}

module.exports = function makeStorageClient() {
  return new Web3Storage({ token: getAccessToken() })
}