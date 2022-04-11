import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import _ from "lodash";
const { AccountData, ContractData, ContractForm } = newContextComponents;
var BenefitToken = require('../contracts/BenefitToken.json')
var contract = require("@truffle/contract");
var Web3 = require('web3');


class Benefit extends React.Component {
    constructor(props) {
        super(props);


    }

    state ={
        threshold: 10,
        cost: 5,
        benefitText: "meeting"
    }

    handleChangeThreshold(e) {
        this.setState({
            threshold: e.target.value,
            benefitList: []
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        //console.log(await this.getBenefit())

    }

    async getBenefit() {
        return this.props.drizzle.contracts.BenefitToken.methods.getBenefits().call();
    }

    async onClick(drizzle) {
        console.log(drizzle.web3.eth.accounts.givenProvider.selectedAddress)
        console.log(await drizzle.contracts.BenefitToken.methods.publisher().call())
        drizzle.contracts.BenefitToken.methods.addBenefit(
            this.state.threshold,
            this.state.cost,
            this.state.benefitText
        ).call();
    }




    render() {
        return (
            <div>
                {/*<input*/}
                {/*    placeholder="threshold"*/}
                {/*    value={this.state.threshold}*/}
                {/*    onChange={this.handleChangeThreshold}*/}
                {/*/>*/}
                {/*<button onClick={(e) => this.onClick(this.props.drizzle)}>*/}
                {/*    addBenefit*/}
                {/*</button>*/}

                <ContractForm
                    drizzle={this.props.drizzle}
                    contract="BenefitToken"
                    method="addBenefit"
                    labels={["threshold", "cost", "benefitText"]}
                />
            </div>
        );
    }
}

export default Benefit;