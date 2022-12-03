
const express = require("express");
const ethers = require("ethers")
const router = express.Router();

const LendingPool_abi = require("./artifacts/contracts/protocol/lendingpool/LendingPool.sol/LendingPool.json")

router.post("/creditscore", async (req, res) => {
    const { public_address } = req.body;

    console.log("public_address: ", public_address)

    provider = new ethers.getDefaultProvider("http://127.0.0.1:7545");

    const currentBlock = await provider.getBlockNumber()

    console.log("currentBlock: ", currentBlock)

    const lendingPool_contract = new ethers.Contract(
        "0x994Fc5BA66D36c04E68886BCfAac700634bf8ff9",
        LendingPool_abi.abi,
        provider
    )

    const publicAdd = public_address.toString()

    const borrowFilter = lendingPool_contract.filters.Borrow(null, null, publicAdd, null, null, null, null)
    const repayFilter = lendingPool_contract.filters.Repay(null, publicAdd, null, null)

    const LiquidationFilter = lendingPool_contract.filters.LiquidationCall(null, null, publicAdd, null, null, null, null)
    console.log("contract2: ")

    const borrowResults = await lendingPool_contract.queryFilter(borrowFilter, 0, currentBlock)
    const repayResults = await lendingPool_contract.queryFilter(repayFilter, 0, currentBlock)
    const liquidationResults = await lendingPool_contract.queryFilter(LiquidationFilter, 0, currentBlock)

    console.log("Borrows: ", borrowResults)
    console.log("Repays: ", repayResults)
    console.log("liquidations:", liquidationResults)

    const numberOfBorrows = borrowResults.length
    const numberOfRepays = repayResults.length
    const number_of_liquidations = liquidationResults.length

    console.log("NB,NR,NLC:", numberOfBorrows, numberOfRepays, number_of_liquidations);

    let totalBorrowed = 0;
    let totalRepaid = 0;

    for (let i = 0; i < borrowResults.length; i++) {
        const bRes = borrowResults[i]
        const rRes = repayResults[i]

        let rRes_amount = numberOfRepays == 0 ? 0 : await rRes.args.amount
        let bRes_amount = numberOfBorrows == 0 ? 0 : await bRes.args.amount

        console.log("rRes: ", rRes)

        totalBorrowed = totalBorrowed + bRes_amount
        totalRepaid = totalRepaid + rRes_amount
    }

    totalBorrowed = totalBorrowed.toString()
    totalRepaid = totalRepaid.toString()

    console.log("repaid amount and borrowed amount:", totalRepaid, totalBorrowed)

    let totalNetBorrowRepayAmount = totalBorrowed - totalRepaid

    let score = 0;
    const MAX_TXS_TO_GET_HIGH_CRED = 100;
    const MAX_VOL_TO_GET_HIGH_CRED = 12500750000;

    const a = numberOfBorrows / MAX_TXS_TO_GET_HIGH_CRED
    const b = totalRepaid.toString() / MAX_VOL_TO_GET_HIGH_CRED

    //based on number of repayments
    if (numberOfRepays > 0 && numberOfRepays < MAX_TXS_TO_GET_HIGH_CRED) {
        score = score + (a * 40)
    }
    else if (numberOfRepays >= MAX_TXS_TO_GET_HIGH_CRED) {
        score = score + 40
    }

    //based on number of liquidations
    if (number_of_liquidations == 0 && numberOfRepays != 0) {
        score = score + 30
    }
    else if (number_of_liquidations > 0) {
        // because we dont want user who got liquidated once to get 30 credit score 
        //like other user got without getting liquidated
        let temp = number_of_liquidations + 1
        score = score + (30 / temp)
    }

    //based on repayment amount
    if (totalRepaid > 0 && totalRepaid < MAX_VOL_TO_GET_HIGH_CRED) {
        score = score + (b * 30)
    } else if (totalRepaid >= MAX_VOL_TO_GET_HIGH_CRED) {
        score = score + 30
    }


    //console.log("totalNetBorrowRepayAmount: ", totalNetBorrowRepayAmount)

    // if(number_of_liquidations==0){
    //      score = totalNetBorrowRepayAmount * ratioOfRepaysAndBorrows * 0.25
    // }
    // else{
    //     score = totalNetBorrowRepayAmount * ratioOfRepaysAndBorrows * 0.25 / number_of_liquidations
    // }


    console.log("score is :", score);

    // for (var res in res1) {
    //     // console.log(res, ": ", res1[res])
    //     // if (res == "getBlock")
    //     //     console.log(res, ": ", await res1.getBlock())
    //     // else if (res == "getTransaction")
    //     //     console.log(res, ": ", await res1.getTransaction())
    //     // else if (res == "getTransactionReceipt")
    //     //     console.log(res, ": ", await res1.getTransactionReceipt())
    // }


    console.log("depositResults: ", score)
    return res.status(200).json({ score })


});

module.exports = router