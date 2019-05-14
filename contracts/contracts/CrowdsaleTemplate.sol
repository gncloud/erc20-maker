pragma solidity 0.5.2;

import "openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
// import "openzeppelin-solidity/contracts/crowdsale/distribution/FinalizableCrowdsale.sol";


// contract CrowdsaleTemplate is Crowdsale, TimedCrowdsale, CappedCrowdsale, MintedCrowdsale, FinalizableCrowdsale {
    contract CrowdsaleTemplate is Crowdsale, TimedCrowdsale, CappedCrowdsale, MintedCrowdsale {
    constructor(
        uint256 _rate,
        address payable _wallet,
        ERC20 _token,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _cap
    )
        TimedCrowdsale(_openingTime, _closingTime)
        CappedCrowdsale(_cap)
        Crowdsale(_rate, _wallet, _token)
        public
    {}
    
    // function () external payable {
    //     buyTokens(msg.sender);
    // }

}
