import { LendingPool, InterestRate } from '@aave/contract-helpers';
import deployed_contracts_address from "../deployed-contracts.json"
import { submitTransaction } from "./SubmitTransaction";

export const onRepay = async (provider, amount, reserve, user, interestRateMode) => {

    const realProvider = provider.provider
    const lendingPoolAddress = deployed_contracts_address.LendingPool.coverage.address
    const wethGatewayAddress = deployed_contracts_address.WETHGateway.coverage.address
    const realAmount = amount.amount

    const lendingPool = new LendingPool(realProvider, {
        LENDING_POOL: lendingPoolAddress,
        WETH_GATEWAY: wethGatewayAddress,
    });

    console.log(InterestRate.Variable, realAmount, user, reserve)

    const txs = await lendingPool.repay({
        user,
        reserve,
        amount: realAmount,
        interestRateMode: InterestRate.Variable,
    });

    console.log(txs)

    return txs
}