const fs = require("fs");

const contractID = {
    PROTOCOL: "Protocol",
    CTOKEN: "cToken",
    DEBTTOKEN: "debtToken",
    DAI: "DAI",
    MINTABLEERC20: "MintableERC20",
    CREDITTOKEN: "creditToken",
}

task("local:deploy-contracts", "Deploys contracts and initialises")
    .setAction(async ({ }, { ethers }) => {

        const [deployer] = await ethers.getSigners();
        console.log(
            "Deploying the contracts with the account:",
            await deployer.getAddress()
        );

        console.log("Account balance:", (await deployer.getBalance()).toString());

        const Contract = await ethers.getContractFactory("Protocol");
        const contract = await Contract.deploy();
        await contract.deployed();
        console.log("contract address:", contractID.PROTOCOL, contract.address);
        saveFrontendFiles(contract, contractID.PROTOCOL);

        function saveFrontendFiles(contract, id) {
            const fs = require("fs");
            const contractsDir = __dirname + "/../frontend/src/contracts";
            console.log("ID: ", id)
            if (!fs.existsSync(contractsDir)) {
                fs.mkdirSync(contractsDir);
            }

            var obj = {}
            obj[id] = contract.address

            fs.writeFileSync(
                contractsDir + "/contract-address.json",
                JSON.stringify(obj, undefined, 2)
            );

            console.log("Done printing contract address")

            const contractArtifact = artifacts.readArtifactSync(id);

            fs.writeFileSync(
                contractsDir + "/" + id + ".json",
                JSON.stringify(contractArtifact, null, 2)
            );
        }

    });
