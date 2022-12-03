const fs = require("fs");

const contractID = {
    PROTOCOL: "Protocol",
    CTOKEN: "cToken",
    DEBTTOKEN: "debtToken",
    DAI: "DAI",
    MINTABLEERC20: "MintableERC20",
    CREDITTOKEN: "creditToken",
}

task("local:deploy-tokens", "Deploys contracts and initialises")
    .setAction(async ({ }, { ethers }) => {

        const [deployer] = await ethers.getSigners();
        console.log(
            "Deploying the contracts with the account:",
            await deployer.getAddress()
        );

        console.log("Account balance:", (await deployer.getBalance()).toString());

        var Contract = null
        var tx = null
        var contract = null
        Contract = await ethers.getContractFactory("MintableERC20");

        var contract = await Contract.deploy("DAI", "DAI", 18);
        await contract.deployed();

        saveFrontendFiles(contract, contractID.DAI, contractID.MINTABLEERC20);

        var ccontract = await Contract.deploy("cDAI", "cDAI", 18);
        await ccontract.deployed();

        saveFrontendFiles(ccontract, contractID.CTOKEN, contractID.MINTABLEERC20);

        var dcontract = await Contract.deploy("debtDAI", "dDAI", 18);
        await dcontract.deployed();

        saveFrontendFiles(dcontract, contractID.DEBTTOKEN, contractID.MINTABLEERC20);

        var crcontract = await Contract.deploy("crDAI", "crDAI", 18);
        await crcontract.deployed();

        saveFrontendFiles(crcontract, contractID.CREDITTOKEN, contractID.MINTABLEERC20);

        console.log("contract", contract.address)
        console.log("ccontract", ccontract.address)
        console.log("dcontract", dcontract.address)
        console.log("crcontract", crcontract.address)
        console.log("Done")

        function saveFrontendFiles(contract, id, artifactId) {
            const fs = require("fs");
            const contractsDir = __dirname + "/../frontend/src/contracts";
            console.log("ID: ", id)
            if (!fs.existsSync(contractsDir)) {
                fs.mkdirSync(contractsDir);
            }

            const addressesFile =
                __dirname + "/../frontend/src/contracts/contract-address.json";

            const addressJson = fs.readFileSync(addressesFile);
            var address = JSON.parse(addressJson);
            address[id] = contract.address

            fs.writeFileSync(
                contractsDir + "/contract-address.json",
                JSON.stringify(address, undefined, 2)
            );

            console.log("Done printing contract address")

            const contractArtifact = artifacts.readArtifactSync(artifactId);

            fs.writeFileSync(
                contractsDir + "/" + artifactId + ".json",
                JSON.stringify(contractArtifact, null, 2)
            );
        }

    });
