// SPDX-License-Identifier: MIT
pragma solidity 0.6.12;

import './dependencies/openzeppelin/contracts721/token/ERC721/ERC721.sol';
import './dependencies/openzeppelin/contracts721/token/ERC721/ERC721Burnable.sol';
import './dependencies/openzeppelin/contracts721/access/Ownable.sol';
import './dependencies/openzeppelin/contracts721/utils/Counters.sol';

contract CredifyPremiumNFT is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("CredifyPremiumNFT", "CP") public {}

    function _baseURI() internal pure returns (string memory) {
        return "ipfs://";
    }

    function mintCredifyPremium(string memory _tokenURI,address to) public payable {
        require(to!=address(0),"cannot mint to zero address");

        //check if the balance of credit score in tokens
        //if more than 50 then mint the nft if not revert


        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function burnCredifyPremium(uint256 tokenId)public {
        require(msg.sender == ownerOf(tokenId),"only owner can burn");
        _burn(tokenId);
    }
}