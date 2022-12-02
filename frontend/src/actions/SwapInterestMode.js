
import { LendingPool, InterestRate } from '@aave/contract-helpers';
import { use } from 'chai';
import deployed_contracts_address from "../deployed-contracts.json"
import { submitTransaction } from "./SubmitTransaction";

export const onSwapInterestMode = async (provider, reserve, user, interestRateMode) => {

    const realProvider = provider.provider
    const lendingPoolAddress = deployed_contracts_address.LendingPool.coverage.address

    const lendingPool = new LendingPool(realProvider, {
        LENDING_POOL: lendingPoolAddress,
    });

    console.log("swapinterestmode", "interestRateMode:", interestRateMode, "user", user, "reserve", reserve)

    const txs = await lendingPool.swapBorrowRateMode({
        user,
        reserve,
        interestRateMode: interestRateMode,
    });

    console.log(txs)

    return txs
}


