pragma solidity ^0.8.9;

// We import this library to be able to use console.log
import "hardhat/console.sol";

contract Protocol {
    uint256 totalNoOfVoters;
    mapping(address => bool) internal voters;

    function deposit(uint256 amount, address reserve) {
        totalNoOfVoters = totalNoOfVoters + 1;

        DataTypes.ReserveData storage reserve = _reserves[asset];
        address aToken = reserve.aTokenAddress;
        IERC20(asset).safeTransferFrom(msg.sender, aToken, amount);
        IERC20(asset).safeTransferFrom(msg.sender, aToken, amount);

        IAToken(aToken).mint(onBehalfOf, amount, reserve.liquidityIndex);

        if (isFirstDeposit) {
            _usersConfig[onBehalfOf].setUsingAsCollateral(reserve.id, true);
            emit ReserveUsedAsCollateralEnabled(asset, onBehalfOf);
        }
    }
}
