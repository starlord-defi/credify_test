// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

import {ERC20} from "./ERC20.sol";
import {IERC20} from "./IERC20.sol";

contract MintableERC20 is ERC20 {
    constructor(
        string memory name,
        string memory symbol,
        uint8 decimals
    ) public ERC20(name, symbol) {
        _setupDecimals(decimals);
    }

    function mint(uint256 value, address to) public returns (bool) {
        _mint(to, value);
        return true;
    }

    function transferUnderlyingTo(
        address target,
        uint256 amount,
        address underlyingAsset
    ) external returns (uint256) {
        IERC20(underlyingAsset).transfer(target, amount);
        return amount;
    }
}
