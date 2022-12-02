import { LendingPool, InterestRate } from '@aave/contract-helpers';
import deployed_contracts_address from "../deployed-contracts.json"
import { submitTransaction } from "./SubmitTransaction";

export const onBorrow = async (provider, amount, reserve, user, interestRateMode) => {

    const realProvider = provider.provider
    const lendingPoolAddress = deployed_contracts_address.LendingPool.coverage.address
    const wethGatewayAddress = deployed_contracts_address.WETHGateway.coverage.address
    const realAmount = amount.amount

    const lendingPool = new LendingPool(realProvider, {
        LENDING_POOL: lendingPoolAddress,
        WETH_GATEWAY: wethGatewayAddress,
    });

    console.log(interestRateMode, realAmount, user, reserve)

    const txs = await lendingPool.borrow({
        user,
        reserve,
        amount: realAmount,
        interestRateMode: interestRateMode,
    });

    console.log(txs)

    return txs
}

/*
- @param `user` The ethereum address that will receive the borrowed amount 
- @param `reserve` The ethereum address of the reserve asset 
- @param `amount` The amount to be borrowed, in human readable units (e.g. 2.5 ETH) 
- @param `interestRateMode`//Whether the borrow will incur a stable (InterestRate.Stable) or variable (InterestRate.Variable) interest rate
- @param @optional `debtTokenAddress` The ethereum address of the debt token of the asset you want to borrow. Only needed if the reserve is ETH mock address 
- @param @optional `onBehalfOf` The ethereum address for which user is borrowing. It will default to the user address 
*/
