// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BenefitToken is ERC20 {
    string public name = "BenefitToken";
    string public symbol = "BNT";
    uint256 public decimals = 0;
    uint256 public INITIAL_SUPPLY = 500;

    enum Step {Init, Req, Accept, Done}
    struct Benefit {
        uint threshold;
        uint cost;
        string benefitText;
    }

    struct BenefitProgress {
        address requestor;
        Benefit benefit;
        Step states;
    }

    mapping(address => Benefit[]) private benefitLists;
    mapping(address => BenefitProgress[]) private benefitProgress;
    mapping(address => address[]) private benefitOffererOfRequestor;


    modifier onlyTenTokenHolder() {
        require(balanceOf(msg.sender) >= 10, "please pocess more token ");
        _;
    }
    constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    function getBenefits(address benefitOfferer) public view returns(Benefit[] memory) {
        return benefitLists[benefitOfferer];
    }

    function getBenefitProgressOfOfferer() public view returns (BenefitProgress[] memory) {
        return benefitProgress[msg.sender];
    }

    function getBenefitProgressOfRequestor() public view returns (address[] memory) {
        return benefitOffererOfRequestor[msg.sender];

    }

    function addBenefit(uint threshold, uint cost, string memory benefitText) public onlyTenTokenHolder {
        require(benefitLists[msg.sender].length < 5, "benefit max 5");
        benefitLists[msg.sender].push(Benefit({
            threshold: threshold,
            cost: cost,
            benefitText: benefitText
        }));
    }


    function deleteBenefit() public onlyTenTokenHolder {
        require(benefitLists[msg.sender].length > 0, "benefit list is null");
        benefitLists[msg.sender].pop();

    }


    function requestBenefit(address offerer, uint benefitIdx) public {
        require(benefitLists[offerer].length > benefitIdx, "invalid index");
        require(benefitProgress[offerer].length < 5, "offerer handle max 5 offer");
        require(benefitOffererOfRequestor[msg.sender].length < 5, "requster only request max 5");
        require(benefitLists[offerer].length > 0, "offerer benefit null");

        uint threshold = benefitLists[offerer][benefitIdx].threshold;
        require(threshold < balanceOf(msg.sender), "insufficient coin");

        benefitProgress[offerer].push(BenefitProgress({
            requestor: msg.sender,
            benefit: benefitLists[offerer][benefitIdx],
            states: Step.Req
        }));
        benefitOffererOfRequestor[msg.sender].push(offerer);

    }

    function acceptBenefit(address requestor) public onlyTenTokenHolder {
        for (uint i =0; i < 5; i++ ) {
            if ((benefitProgress[msg.sender][i].requestor == requestor) && (benefitProgress[msg.sender][i].states == Step.Req)) {
                benefitProgress[msg.sender][i].states = Step.Accept;
                break;
            }
        }

    }

    function completeBenefit(address offerer) public {
        uint i = 0;
        uint j = 0;
        for (i =0; i < 5; i++ ) {
            if ((benefitProgress[offerer][i].requestor == msg.sender) && (benefitProgress[offerer][i].states == Step.Accept)) {
                //Benefit memory benefit = benefitProgress[offerer][i];
                benefitProgress[offerer][i].states = Step.Accept;
                if ( benefitProgress[offerer][i].benefit.cost > 0)
                    transfer(offerer,  benefitProgress[offerer][i].benefit.cost);
                break;
            }
        }

        if (i != 5) {
            benefitProgress[offerer][i] = benefitProgress[offerer][benefitProgress[offerer].length - 1];
            benefitProgress[offerer].pop();

            for (j = 0; j < 5; j++) {
                if (benefitOffererOfRequestor[msg.sender][j] == offerer) {
                    break;
                }
            }
            if (j != 5) {
                benefitOffererOfRequestor[msg.sender][j] = benefitOffererOfRequestor[msg.sender][benefitOffererOfRequestor[msg.sender].length - 1];
                benefitOffererOfRequestor[msg.sender].pop();
            }

        }
    }

}
