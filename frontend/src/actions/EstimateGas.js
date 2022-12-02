import { ethers } from "ethers"
export default async function EstimateGas(txs) {
    let totalGas = 0
    for (var tx in txs) {
        let gas = await txs[tx].gas()
        let gasPrice = gas["gasPrice"]
        let gasLimit = gas["gasLimit"]
        console.log(gas)
        totalGas += parseFloat(gasPrice) * parseFloat(gasLimit)
        console.log(gasPrice, gasLimit, totalGas)
    }
    console.log("clicked")
    console.log((ethers.utils.formatEther((totalGas).toString())))
    let totalGasString = (totalGas).toString()
    let totalGasFloat = parseFloat(ethers.utils.formatEther(totalGasString))
    let totalGasUSD = (totalGasFloat) * 1000
    return totalGasUSD;
}
