import { BigNumber } from 'ethers';

export const submitTransaction = async (realProvider, txs) => {
    let res = null
    if (realProvider) {
        for (var tx in txs) {
            try {
                const extendedTxData = await txs[tx].tx();
                const { from, ...txData } = extendedTxData;
                const signer = realProvider.getSigner(from);
                const txResponse = await signer.sendTransaction({
                    ...txData,
                    value: txData.value ? BigNumber.from(txData.value) : undefined,
                });

                console.log("txResponse: ", txResponse);
                res = await txResponse.wait()
                console.log("result: ", res);
            }
            catch (err) {
                console.log(err)
            }
        }
        return res
    }
}