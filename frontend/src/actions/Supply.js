import { LendingPool } from '@aave/contract-helpers';
import deployed_contracts_address from "../deployed-contracts.json"
import { submitTransaction } from "./SubmitTransaction";

export const onSupply = async (provider, amount, reserve, user) => {

    const realProvider = provider.provider
    const lendingPoolAddress = deployed_contracts_address.LendingPool.coverage.address
    const wethGatewayAddress = deployed_contracts_address.WETHGateway.coverage.address
    const realAmount = amount.amount

    const lendingPool = new LendingPool(realProvider, {
        LENDING_POOL: lendingPoolAddress,
        WETH_GATEWAY: wethGatewayAddress,
    });

    const txs = await lendingPool.deposit({
        user,
        reserve,
        amount: realAmount
    });

    console.log(txs)

    return txs
}