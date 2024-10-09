// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract Erc721collection is ERC721, ERC721URIStorage, Ownable {

    string public baseUri;

    event CollectionCreated(address collectionAddress, string name, string symbol);
    event TokenMinted(address collection, address recipient, uint256 tokenId, string tokenUri);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) Ownable(msg.sender){
        emit CollectionCreated(address(this), name, symbol);
    }

    function mint(address _to, uint256 tokenId, string memory uri) public onlyOwner{
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, uri);
        emit TokenMinted(address(this), _to, tokenId, uri);
    }

    function setTokenUri(uint256 tokenId, string memory _tokenURI) public onlyOwner{
        super._setTokenURI(tokenId,_tokenURI);
    }

    function setBaseUri(string memory _baseUri) public onlyOwner {
        baseUri = _baseUri;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseUri;
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId) public view virtual override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

}
