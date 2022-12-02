import { ERC20Service } from '@aave/contract-helpers';
import deployed_contracts_address from "../deployed-contracts.json"

export const isApproved = async (provider, reserve, user, amount) => {

    const realProvider = provider.provider
    const lendingPoolAddress = deployed_contracts_address.LendingPool.coverage.address
    const realAmount = amount.amount

    const erc20Service = new ERC20Service(realProvider);

    console.log(user, reserve, lendingPoolAddress, realAmount)

    const approved = await erc20Service.isApproved({
        token: reserve,
        user,
        spender: lendingPoolAddress,
        amount: realAmount,
    });

    console.log(approved)
    return approved
}

