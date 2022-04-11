import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import _ from "lodash";
const { AccountData, ContractData, ContractForm } = newContextComponents;
var BenefitToken = require('../contracts/BenefitToken.json')
var contract = require("@truffle/contract");
var Web3 = require('web3');


class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.contracts = {}
    }

    state = {
        accounts: {},
        balances: []
    }

    async componentDidMount() {
        const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(web3Provider);
        web3.eth.defaultAccount = web3.eth.accounts[0] // 이거 없으니 동작 안했음...
        const accounts = await web3.eth.getAccounts();


        this.contracts.BenefitToken = contract(BenefitToken);
        this.contracts.BenefitToken.setProvider(web3Provider);
        const balances = []
        for (const i of accounts) {
            balances.push(await this.getBalance(i));
        }
        this.setState({
            accounts: accounts,
            balances: balances
        })

    }

    async getBalance(account) {
        return this.contracts.BenefitToken.deployed().then((instance) => {
            return instance.balanceOf(account)
        }).then((result) => {
            return result.words[0]
        }).catch((error) => {
            console.log(error)
        })

    }

    render() {
        const wholeAccount = this.state.accounts;
        const accounts = _.map(wholeAccount, (val) => val);
        const accountList = _.keys(wholeAccount)
        return (
            <div>
                {
                    accounts.map(
                        (account, key) =>
                            <div key={key}>
                                <p>{`Account : ${account}`}</p>
                                <p>{`Balance : ${this.state.balances[key]}`}</p>
                                <hr />
                            </div>
                    )
                }
            </div>
        );
    }
}

export default Accounts;