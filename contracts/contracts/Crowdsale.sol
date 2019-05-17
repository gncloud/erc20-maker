pragma solidity ^0.5.2;

import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/distribution/FinalizableCrowdsale.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";

contract MyCrowdsale is CappedCrowdsale, FinalizableCrowdsale {

    constructor(
        uint256 _rate,
        address payable _wallet,
        ERC20 _token,
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime
    ) public
        CappedCrowdsale(_cap)
        Crowdsale(_rate, _wallet, _token)
    {}
}