const fs = require("fs");

const contractID = {
    PROTOCOL: "Protocol",
    CTOKEN: "cToken",
    DEBTTOKEN: "debtToken",
    DAI: "DAI",
    MINTABLEERC20: "MintableERC20",
    CREDITTOKEN: "creditToken",
}

task("local:mint-tokens", "Deploys contracts and initialises")
    .setAction(async ({ }, { ethers }) => {
        const addressesFile =
            __dirname + "/../frontend/src/contracts/contract-address.json";

        const addressJson = fs.readFileSync(addressesFile);
        const address = JSON.parse(addressJson);

        const DAI = await ethers.getContractAt("MintableERC20", address.DAI);
        const [sender] = await ethers.getSigners();

        await DAI.mint(ethers.utils.parseEther('10000'), sender.address)
        console.log("Minted")

    });


