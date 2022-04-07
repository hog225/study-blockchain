import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import _ from "lodash";
const { AccountData, ContractData, ContractForm } = newContextComponents;
var Web3 = require('web3');

class Accounts extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        accounts: {}
    }

    async componentDidMount() {
        const web3Provider = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
        const web3 = new Web3(web3Provider);
        web3.eth.defaultAccount = web3.eth.accounts[0] // 이거 없으니 동작 안했음...
        const accounts = await web3.eth.getAccounts();
        this.setState({
            accounts: accounts
        })
        console.log(accounts)

    }

    render() {
        const wholeAccount = this.props.drizzleState.accounts;
        const accounts = _.map(wholeAccount, (val) => val);
        const accountList = _.keys(wholeAccount)
        return (
            <div>
                {
                    accountList.map(
                        (accountIdx, key) =>
                            <div key={accountIdx}>
                                <AccountData
                                    drizzle={this.props.drizzle}
                                    drizzleState={this.props.drizzleState}
                                    accountIndex={parseInt(accountIdx)}
                                    units="ether"
                                    precision={3}
                                />
                                <strong>
                                    <ContractData
                                        drizzle={this.props.drizzle}
                                        drizzleState={this.props.drizzleState}
                                        contract="BenefitToken"
                                        method="symbol"
                                        hideIndicator
                                    />{" "}
                                </strong>
                                <ContractData
                                    drizzle={this.props.drizzle}
                                    drizzleState={this.props.drizzleState}
                                    contract="BenefitToken"
                                    method="balanceOf"
                                    methodArgs={[this.props.drizzleState.accounts[parseInt(accountIdx)]]}
                                />
                                <hr />
                            </div>
                    )
                }
            </div>
        );
    }
}

export default Accounts;