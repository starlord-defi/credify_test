pragma solidity 0.6.12;

// We import this library to be able to use console.log
import "hardhat/console.sol";
import {IMintableERC20} from "./IMintableERC20.sol";
pragma experimental ABIEncoderV2;

contract Protocol {
    uint256 totalNoOfVoters;
    address[] assets;
    uint256 totalAssets;

    struct reserveSet {
        address cTokenAddress;
        address debtTokenAddress;
        address credTokensAddress;
        string name;
    }

    struct borrowSet {
        uint256 amount;
        address asset;
        address user;
        uint256 creditScore;
        uint256 noOfVotes;
        bool approved;
        mapping(address => bool) voted;
    }

    struct userSet {
        uint256 creditscore;
    }

    mapping(address => bool) internal voters;
    mapping(address => reserveSet) public reserves;
    mapping(address => borrowSet) public borrows;
    mapping(address => userSet) public users;

    event Deposit(
        address indexed reserveAddress,
        address indexed user,
        uint256 amount
    );

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
        reserve.name = name;
    }

    function vote(address appliant) external {
        borrowSet storage borrow = borrows[appliant];
        bool voted = borrow.voted[msg.sender];
        require(voted == false, "Already Voted");
        borrow.voted[msg.sender] = true;
        uint256 noOfVotes = borrow.noOfVotes;
        borrow.noOfVotes = noOfVotes + 1;

        if (noOfVotes > (totalNoOfVoters / 2)) {
            address asset = borrow.asset;
            address user = borrow.user;
            uint256 amount = borrow.amount;
            reserveSet storage reserve = reserves[asset];
            address debtToken = reserve.debtTokenAddress;
            address cToken = reserve.cTokenAddress;
            borrow.approved = true;
            IMintableERC20(cToken).transferUnderlyingTo(user, amount, asset);
            IMintableERC20(debtToken).mint(amount, user);
            //Notify through Push
        } else {
            return;
        }
    }

    function applyBorrow(
        uint256 amount,
        address asset,
        uint256 creditscore
    ) external {
        userSet memory user = users[msg.sender];

        require(
            user.creditscore > 0,
            "Credit Score should be minted and more than zero"
        );

        borrowSet storage borrow = borrows[msg.sender];
        borrow.amount = amount;
        borrow.user = msg.sender;
        borrow.creditScore = user.creditscore;
        borrow.asset = asset;
    }

    function setCredit(uint256 creditScore) external {
        userSet storage user = users[msg.sender];
        user.creditscore = creditScore;
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

    // function getData() external view returns(){
    //     reserveSet[] reservesTemp;
    // for (uint256 i = 0; i < totalAssets; i++) {
    //           reservesTemp.push(reserves[assets[i]]);
    // }
    //         return (reservesTemp,, )
}
