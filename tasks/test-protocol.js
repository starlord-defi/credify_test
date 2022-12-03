const fs = require("fs");

const contractID = {
    PROTOCOL: "Protocol",
    CTOKEN: "cToken",
    DEBTTOKEN: "debtToken",
    DAI: "DAI",
    MINTABLEERC20: "MintableERC20",
    CREDITTOKEN: "creditToken",
}

task("local:test-protocol", "Deploys contracts and initialises")
    .setAction(async ({ }, { ethers }) => {
        const addressesFile =
            __dirname + "/../frontend/src/contracts/contract-address.json";

        if (!fs.existsSync(addressesFile)) {
            console.error("You need to deploy your contract first");
            return;
        }

        const addressJson = fs.readFileSync(addressesFile);
        const address = JSON.parse(addressJson);

        const protocol = await ethers.getContractAt("Protocol", address.Protocol);
        const DAI = await ethers.getContractAt("MintableERC20", address.DAI);

        const [sender] = await ethers.getSigners();
        console.log("Proto")

        console.log("contract: ", protocol, "address: ", address)

        tx = await protocol.addReserve(
            address.DAI,
            address.cToken,
            address.debtToken,
            address.creditToken,
            "DAI"
        )
        await tx.wait();
        console.log("Added Reserve")

        tx = await protocol.getReserve(address.DAI)
        console.log("tx reserves: ", tx)
        tx = await protocol.getAssests()
        console.log("tx reserves: ", tx)


        const APPROVAL_AMOUNT_LENDING_POOL = '1000000000000000000000000000';

        await DAI.approve(protocol.address, APPROVAL_AMOUNT_LENDING_POOL)
        tx = await protocol.deposit(ethers.utils.parseEther('10000'), address.DAI)
        console.log("Deposited")

    });


