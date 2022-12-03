// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;
pragma experimental ABIEncoderV2;

import {IERC20} from "./IERC20.sol";

interface IMintableERC20 is IERC20 {
    function mint(uint256 value, address to) external returns (bool);

    function transferUnderlyingTo(
        address target,
        uint256 amount,
        address underlyingAsset
    ) external returns (uint256);
}
