pragma solidity 0.4.24;

import './GustavoCoin.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";

contract GustavoCoinCrowdsale is TimedCrowdsale, MintedCrowdsale, CappedCrowdsale {
    
    constructor
        (
            uint256 _openingTime,
            uint256 _closingTime,
            uint256 _rate,
            address _wallet,
            uint256 _cap,
            ERC20Mintable _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _closingTime)
        CappedCrowdsale(_cap)
        {}
}