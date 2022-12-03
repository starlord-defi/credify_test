pragma solidity 0.6.12;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import {IMintableERC20} from "./IMintableERC20.sol";
pragma experimental ABIEncoderV2;

import {ICredifyPremiumNFT} from "./ICredifyPremiumNFT.sol";

contract Protocol {
    uint256 totalNoOfVoters = 0;
    address[] assets;
    uint256 totalAssets = 0;
    uint256 totalNoOfBorrowApplications;
    address[] borrowApplicants;
    address nft;

    struct reserveSet {
        address cTokenAddress;
        address debtTokenAddress;
        address credTokensAddress;
        address reserveAddress;
        string name;
    }

    struct borrowSet {
        uint256 amount;
        address asset;
        string assetName;
        address user;
        uint256 creditScore;
        uint256 noOfVotes;
        bool approved;
    }

    struct userSet {
        uint256 creditscore;
        bool set;
    }

    mapping(address => bool) internal voters;
    mapping(address => reserveSet) public reserves;
    mapping(address => borrowSet) public borrows;
    mapping(address => userSet) public users;
    mapping(address => mapping(address => bool)) voted;

    event Deposit(
        address indexed reserveAddress,
        address indexed user,
        uint256 amount
    );

    function setNFTAddress(address nfttt) external {
        nft = nfttt;
    }

    function deposit(uint256 amount, address reserveAddress) external {
        totalNoOfVoters = totalNoOfVoters + 1;

        reserveSet storage reserve = reserves[reserveAddress];
        address cToken = reserve.cTokenAddress;

        IMintableERC20(reserveAddress).transferFrom(msg.sender, cToken, amount);
        IMintableERC20(cToken).mint(amount, msg.sender);

        emit Deposit(reserveAddress, msg.sender, amount);
    }

    function addReserve(
        address reserveAddress,
        address cTokenAddress,
        address debtTokenAddress,
        address credTokensAddress,
        string memory name
    ) external {
        totalAssets = totalAssets + 1;
        assets.push(reserveAddress);
        reserveSet storage reserve = reserves[reserveAddress];
        reserve.cTokenAddress = cTokenAddress;
        reserve.debtTokenAddress = debtTokenAddress;
        reserve.credTokensAddress = credTokensAddress;
        reserve.reserveAddress = reserveAddress;
        reserve.name = name;
    }

    function vote(address appliant) external returns (bool) {
        borrowSet storage borrow = borrows[appliant];
        address user = borrow.user;
        bool votedTemp = voted[msg.sender][user];
        require(votedTemp == false, "Already Voted for this Application");
        voted[msg.sender][user] = true;
        uint256 noOfVotes = borrow.noOfVotes;
        borrow.noOfVotes = noOfVotes + 1;

        if (noOfVotes > (totalNoOfVoters / 2)) {
            address asset = borrow.asset;
            uint256 amount = borrow.amount;
            reserveSet storage reserve = reserves[asset];
            address debtToken = reserve.debtTokenAddress;
            address cToken = reserve.cTokenAddress;
            borrow.approved = true;
            IMintableERC20(cToken).transferUnderlyingTo(user, amount, asset);
            IMintableERC20(debtToken).mint(amount, user);
            return (true);
            //Notify through Push
        } else {
            return (false);
        }
    }

    function applyBorrow(
        uint256 amount,
        address asset,
        uint256 creditscore,
        string calldata name
    ) external {
        userSet memory user = users[msg.sender];

        require(
            user.creditscore > 0,
            "Credit Score should be minted and more than zero"
        );
        borrowApplicants.push(msg.sender);
        totalNoOfBorrowApplications += 1;
        borrowSet storage borrow = borrows[msg.sender];
        borrow.amount = amount;
        borrow.user = msg.sender;
        borrow.creditScore = user.creditscore;
        borrow.asset = asset;
        borrow.assetName = name;
    }

    function setCredit(uint256 creditScore) external {
        userSet storage user = users[msg.sender];
        require(user.set == false, "CreditScore already set");
        user.set = true;
        user.creditscore = creditScore;
        if (creditScore >= 30) {
            console.log("In:");
            ICredifyPremiumNFT(nft).mintCredifyPremium(
                creditScore,
                "Hi",
                msg.sender
            );
            console.log("Printed");
        }
    }

    function getCredit() external view returns (uint256, bool) {
        userSet memory user = users[msg.sender];
        uint256 cred = user.creditscore;
        bool set = user.set;
        return (cred, set);
    }

    function getReserve(address asset)
        external
        view
        returns (reserveSet memory)
    {
        return reserves[asset];
    }

    function getAssests() external view returns (address[] memory, uint256) {
        return (assets, totalAssets);
    }

    function getData(address user)
        external
        view
        returns (
            reserveSet[] memory,
            borrowSet memory,
            borrowSet[] memory,
            uint256,
            uint256
        )
    {
        reserveSet[] memory reservesTemp = new reserveSet[](assets.length);
        borrowSet[] memory borrowsTemp = new borrowSet[](
            borrowApplicants.length
        );

        for (uint256 i = 0; i < totalAssets; i++) {
            address assetAddress = assets[i];
            reserveSet memory reserveT = reservesTemp[i];
            reserveSet memory reserve = reserves[assetAddress];
            reserveT.cTokenAddress = reserve.cTokenAddress;
            reserveT.debtTokenAddress = reserve.debtTokenAddress;
            reserveT.credTokensAddress = reserve.credTokensAddress;
            reserveT.reserveAddress = reserve.reserveAddress;
            reserveT.name = reserve.name;
        }

        for (uint256 i = 0; i < totalNoOfBorrowApplications; i++) {
            address applicant = borrowApplicants[i];
            borrowSet memory borrowSetT = borrowsTemp[i];
            borrowSet memory borrow = borrows[applicant];
            borrowSetT.amount = borrow.amount;
            borrowSetT.asset = borrow.asset;
            borrowSetT.assetName = borrow.assetName;
            borrowSetT.user = borrow.user;
            borrowSetT.creditScore = borrow.creditScore;
            borrowSetT.noOfVotes = borrow.noOfVotes;
            borrowSetT.approved = borrow.approved;
        }

        borrowSet memory borrowTemp = borrows[user];

        return (
            reservesTemp,
            borrowTemp,
            borrowsTemp,
            totalNoOfVoters,
            totalAssets
        );
    }
}
