// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BenefitToken is ERC20 {
    string public name = "BenefitToken";
    string public symbol = "BNT";
    uint256 public decimals = 0;
    uint256 public INITIAL_SUPPLY = 500;

    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }
}
