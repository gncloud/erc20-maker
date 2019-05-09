pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Burnable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Capped.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract CappedTokenTemplate is ERC20, ERC20Detailed, ERC20Capped, Ownable {
    
    constructor (
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 totalSupply
    ) ERC20Detailed(name, symbol, decimals) ERC20Capped(totalSupply) public {
        _mint(owner(), totalSupply);
    }

}

contract MintableTokenTemplate is ERC20, ERC20Detailed, ERC20Mintable, Ownable {

    constructor (
        string memory name,
        string memory symbol,
        uint8 decimals,
        uint256 totalSupply
    ) ERC20Detailed(name, symbol, decimals) public {
        _mint(owner(), totalSupply);
    }

}
