const BenefitToken = artifacts.require("BenefitToken");

contract("BenefitToken", async accounts => {


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
    it("test3", async () => {
        const instance = await BenefitToken.deployed();
        await instance.addBenefit(10, 5, "phone");
        await instance.addBenefit(12, 5, "playwith");
        await instance.addBenefit(15, 5, "combatwith");
        await instance.addBenefit(18, 5, "gameRole");

        try {
            await instance.addBenefit(12, 5, "meeting");
        } catch (e) {
            var err = e;
        }
        assert.isOk(err instanceof Error, "benefit max 5")

    });
    it("test4", async () => {
        const instance = await BenefitToken.deployed();
        await instance.deleteBenefit();
        const benefits = await instance.getBenefits(accounts[0]);
        assert.equal(benefits.length, 4);
    });
    // test code
    it("requestBenefit", async () => {
        const instance = await BenefitToken.deployed();
        await instance.addBenefit(10, 5, "phone");
        await instance.addBenefit(20, 3, "meet");

        await instance.transfer(accounts[1], 50);
        await instance.transfer(accounts[2], 50);

        await instance.requestBenefit(accounts[0], 0, {from: accounts[1]});
        await instance.requestBenefit(accounts[0], 1, {from: accounts[2]});

        const offerProgress = await instance.getBenefitProgressOfOfferer()
        console.log(offerProgress[1])
        const requsterOfferProgress = await instance.getBenefitProgressOfRequestor.call({from: accounts[1]})
        console.log(requsterOfferProgress);
    });

    it("acceptBenefit", async () => {
        const instance = await BenefitToken.deployed();
        await instance.addBenefit(10, 5, "phone");
        await instance.addBenefit(20, 3, "meet");

        await instance.transfer(accounts[1], 50);
        await instance.transfer(accounts[2], 50);

        await instance.requestBenefit(accounts[0], 0, {from: accounts[1]});
        await instance.requestBenefit(accounts[0], 1, {from: accounts[2]});

        await instance.acceptBenefit(accounts[2], 1);
        const offerProgress = await instance.getBenefitProgressOfOfferer();
        console.log(offerProgress)

    });

    it("acceptBenefitError", async () => {
        const instance = await BenefitToken.new();
        await instance.addBenefit(10, 5, "phone");
        await instance.addBenefit(20, 3, "meet");

        await instance.transfer(accounts[1], 50);
        await instance.transfer(accounts[2], 50);

        await instance.requestBenefit(accounts[0], 0, {from: accounts[1]});
        await instance.requestBenefit(accounts[0], 1, {from: accounts[2]});


        try {
            await instance.acceptBenefit(accounts[2], 3);
        } catch (e) {
            var err = e;
        }
        assert.isOk(err instanceof Error, "invalid index")

    });

    it("completeBenefit", async () => {
        const instance = await BenefitToken.new();
        await instance.addBenefit(10, 5, "phone");
        await instance.addBenefit(20, 3, "meet");

        await instance.transfer(accounts[1], 50);
        await instance.transfer(accounts[2], 50);
        const balance = await instance.balanceOf(accounts[0]);

        await instance.requestBenefit(accounts[0], 0, {from: accounts[1]});
        await instance.requestBenefit(accounts[0], 1, {from: accounts[2]});

        await instance.acceptBenefit(accounts[2], 1);
        await instance.completeBenefit(accounts[0], 1, {from: accounts[2]});


        const offerProgress = await instance.getBenefitProgressOfOfferer();
        const requsterOfferProgress = await instance.getBenefitProgressOfRequestor.call({from: accounts[2]})
        assert.equal(offerProgress.length, 1)
        assert.equal(requsterOfferProgress.length, 0)

        const afterBalance = await instance.balanceOf(accounts[0])
        assert.equal(afterBalance.toNumber(), balance.toNumber() + 3)

    });




});
