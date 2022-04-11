const BenefitToken = artifacts.require("BenefitToken");

contract("BenefitToken", accounts => {


    it("test1", async () => {
        const instance = await BenefitToken.deployed();
        const symbol = await instance.symbol();
        assert.equal(symbol, "BNT", "Symbol is wrong name");
    });
    it("test2", async () => {
        const instance = await BenefitToken.deployed();
        const result = await instance.addBenefit(10, 5, "meeting");
        const address = result.receipt.from;
        const benefits = await instance.getBenefits(address);
        assert.equal(benefits[0][0], '10')
        assert.equal(benefits[0][1], '5')
        assert.equal(benefits[0][2], 'meeting')

    });
    // benefitLists 5개 이상 추가 안되는지

});
