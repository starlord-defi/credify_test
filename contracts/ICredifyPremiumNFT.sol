// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

interface ICredifyPremiumNFT {
    function mintCredifyPremium(
        uint256 score,
        string memory _tokenURI,
        address to
    ) external;

    function burnCredifyPremium(uint256 tokenId) external;
}
