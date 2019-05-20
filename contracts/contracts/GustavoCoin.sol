pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20Mintable.sol';
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";

contract GustavoCoin is ERC20Detailed, ERC20Mintable, Ownable {
    constructor(
        string name,
        string symbol,
        uint8 decimals,
        uint256 totalSupply
    ) public ERC20Detailed(name, symbol, decimals) {
        mint(owner(), totalSupply);
    }
}