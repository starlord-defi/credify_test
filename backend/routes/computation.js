
const express = require("express");
const ethers = require("ethers")
const router = express.Router();

const LendingPool_abi = require("./artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json")

router.post("/creditscore", async (req, res) => {
    const { public_address } = req.body;

    provider = new ethers.getDefaultProvider("http://127.0.0.1:7545");

    const lendingPool_contract = new ethers.Contract(
        "0x994Fc5BA66D36c04E68886BCfAac700634bf8ff9",
        LendingPool_abi.abi,
        provider
    )

    const borrowFilter = lendingPool_contract.filters.Borrow(null, null, "0x4f6CB28d6c80d71351739090BD9C1529c81CE937", null, null, null, null)
    const repayFilter = lendingPool_contract.filters.Repay(null, "0x4f6CB28d6c80d71351739090BD9C1529c81CE937", null, null)
    const depositFilter = lendingPool_contract.filters.Deposit(null, null, "0x4f6CB28d6c80d71351739090BD9C1529c81CE937", null, null)

    const currentBlockNumber = await provider.getBlockNumber()
    console.log("currentBlockNumber: ", currentBlockNumber)

    const borrowResults = await lendingPool_contract.queryFilter(borrowFilter, 0, currentBlockNumber)
    const repayResults = await lendingPool_contract.queryFilter(repayFilter, 0, currentBlockNumber)
    const depositResults = await lendingPool_contract.queryFilter(depositFilter, 0, currentBlockNumber)
    console.log("depositResults: ", depositResults[0].args.amount.toString())
    return res.status(200).json(depositResults)

});

module.exports = router