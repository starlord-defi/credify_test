// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import "./dependencies/openzeppelin/contracts721/token/ERC721/ERC721.sol";
import "./dependencies/openzeppelin/contracts721/token/ERC721/ERC721Burnable.sol";
import "./dependencies/openzeppelin/contracts721/access/Ownable.sol";
import "./dependencies/openzeppelin/contracts721/utils/Counters.sol";

import "hardhat/console.sol";
contract CredifyPremiumNFT is ERC721("CredifyPremiumNFT", "CP"), ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    function _baseURI() internal pure returns (string memory) {
        return "ipfs://";
    }

    function mintCredifyPremium(uint256 score,string memory _tokenURI,address to) public {
        require(to != address(0), "cannot mint to zero address");
        require(score >= 50 , "credit score must be more than 50");
        require(super.balanceOf(to)<=1,"cannot have more than one nft badge");
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function burnCredifyPremium(uint256 tokenId) public {
        require(msg.sender == super.ownerOf(tokenId), "only owner can burn");
        _burn(tokenId);
    }
}