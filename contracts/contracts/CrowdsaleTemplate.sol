pragma solidity 0.4.24;

import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';
import 'openzeppelin-solidity/contracts/crowdsale/emission/MintedCrowdsale.sol';
import 'openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol';
// import "openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";


contract CrowdsaleTemplate is TimedCrowdsale, MintedCrowdsale {
    
    constructor(
        uint256 _rate,
        address _wallet,
        uint256 _openingTime,
        uint256 _closingTime,
        uint256 _cap,
        IERC20 _token
    )
        public
        Crowdsale(_rate, _wallet, _token)
        // CappedCrowdsale(_cap)
        TimedCrowdsale(_openingTime, _closingTime)
    {}

    // function () external payable {
    //     // TODO 최대 수량값이 상한에 도달하면 편딩이 즉시 종료처리.
    //     super.buyTokens(msg.sender);
    // }
    
}
