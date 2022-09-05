// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract MaxiNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // El primer parámetro es en nombre de neustro NFT y el segundo es la sigla que lo va a identificar.
    constructor() ERC721("MaxiNFT", "MXT") {}

    // Función que publica el NFT. Recibe la dirección del destinatario y la URI donde esta
    //  la metadata del NFT
    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256)
        {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(recipient, newItemId);
            _setTokenURI(newItemId, tokenURI);

            return newItemId;
        }
}