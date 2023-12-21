pragma solidity ^0.8.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTWithOneTimeTokens is ERC721URIStorage, Ownable {
    uint256 public maxTokens; // Total number of tokens that can be minted
    uint256 public tokenCounter; // Current number of tokens minted
    mapping(bytes32 => bool) public usedOneTimeTokens; // Keep track of used one-time tokens

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _maxTokens,
        address _initialOwner
    ) ERC721(_name, _symbol) Ownable(_initialOwner) {
        maxTokens = _maxTokens;
    }

    // Mint an NFT using a one-time token and set URI
    function mintWithOneTimeToken(
        string memory token,
        string memory tokenURI
    ) public {
        bytes32 tokenHash = keccak256(abi.encodePacked(token));
        require(!usedOneTimeTokens[tokenHash], "Token already used");
        require(tokenCounter < maxTokens, "All tokens have been minted");

        usedOneTimeTokens[tokenHash] = true;
        tokenCounter++;

        _mint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
    }

    // Mint an NFT and set URI (only owner can call this function)
    function mint(string memory tokenURI) public onlyOwner {
        require(tokenCounter < maxTokens, "All tokens have been minted");

        tokenCounter++;
        _mint(msg.sender, tokenCounter);
        _setTokenURI(tokenCounter, tokenURI);
    }

    // Add more one-time tokens (only owner can call this function)
    function addOneTimeTokens(string[] memory newTokens) public onlyOwner {
        require(newTokens.length > 0, "No tokens to add");

        for (uint256 i = 0; i < newTokens.length; i++) {
            bytes32 tokenHash = keccak256(abi.encodePacked(newTokens[i]));
            require(!usedOneTimeTokens[tokenHash], "Token already used");

            usedOneTimeTokens[tokenHash] = false;
        }
    }
}
