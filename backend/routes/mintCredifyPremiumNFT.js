import { Web3Storage, getFilesFromPath } from 'web3.storage'

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDE1ZTQ2N2E3NzNiODg2MEI1ZTRGZDNhQUE1YjQ1ZTk5NzQzNTA4QzciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzAwNjQzNTAxNzAsIm5hbWUiOiJDcmVkaWZ5IFByZW1pdW0ifQ.mKdHBo-FwEl0KMiNUysPkkexJoDQBn-iiKyAAvwU7Yc"

const client = new Web3Storage({ token })

async function storeFiles() {

    const files = await getFilesFromPath('../assets/CreditPremium.png')

    const cid = await client.put(files)

    console.log(cid)
    
}



storeFiles() |