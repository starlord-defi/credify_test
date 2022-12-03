const fs = require("fs");

task("local:test-nft", "Deploys contracts and initialises")
    .setAction(async ({ }, { ethers }) => {
        const addressesFile =
            __dirname + "/../frontend/src/contracts/contract-address.json";

        if (!fs.existsSync(addressesFile)) {
            console.error("You need to deploy your contract first");
            return;
        }

        const addressJson = fs.readFileSync(addressesFile);
        const address = JSON.parse(addressJson);

        // const nft = await ethers.getContractAt("Protocol", address.CredifyPremiumNFT);
        const nft = await ethers.getContractAt("CredifyPremiumNFT", address.CredifyPremiumNFT);

        const [sender] = await ethers.getSigners();
        console.log("Sender:",sender.address);

        console.log("contract:address: ", nft.address)
        let tokenId=null;

        //tokenId = await nft.abc();
        const score = 40;

        tokenId = await nft.mintCredifyPremium(
            60,
            sender.address
        )
        //await tokenId.wait();
        //console.log("nft minted here is token id",tokenId.toString())
        let balance=null;
        balance = await nft.balanceOf(sender.address)
        console.log("nft balance: ", balance.toString())
        //let tokenURI
        //tokenURI = await nft.tokenURI(tokenId)
        //console.log("token uri: ", tokenURI)       

    });


