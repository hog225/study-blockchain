import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Accounts from "./components/Accounts";
import Benefit from "./components/Benefit";
const { AccountData, ContractData, ContractForm } = newContextComponents;



class MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.balance = 0;
        this.currentAccount = 0;
        this.allowanceVal = 0;
    }

    // componentDidMount() {
    //     const { drizzleState, drizzle } = this.props;
    //     this.interval = setInterval(() => {
    //         console.log("drizzleState:", drizzleState.accounts[0]);
    //         console.log("web3:", drizzle.web3.eth.accounts.givenProvider.selectedAddress);
    //     }, 3000);
    // }

    state = {
        spender: this.props.drizzleState.accounts[1]
    }

    handleChange = (e) => {

        this.setState({
            spender: e.target.value
        })
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        this.balance = await this.getBalanceUsingWeb3(prevProps.drizzle, prevProps.drizzleState)
        this.currentAccount = await this.getCurrentAccount(prevProps.drizzle, prevProps.drizzleState)
        try {
            this.allowanceVal = await this.getAllowanceUsingWeb3(prevProps.drizzle, prevProps.drizzleState)
        } catch (e) {

        }


    }
    async getBalanceUsingWeb3(drizzle, drizzleState) {
        const account = drizzleState.accounts[0]
        return drizzle.contracts.BenefitToken.methods.balanceOf(account).call();
    }
    async getCurrentAccount(drizzle, drizzleState) {
        return drizzle.web3.eth.getCoinbase();

    }

    async getAllowanceUsingWeb3(drizzle, drizzleState) {
        const selectedAddress = this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress
        return drizzle.contracts.BenefitToken.methods.allowance(selectedAddress, this.state.spender).call();
    }

    render() {
        const selectedAddress = this.props.drizzle.web3.eth.accounts.givenProvider.selectedAddress

        return (
            <div className="App">
                <ToastContainer />
                <div>
                    <img src={logo} alt="drizzle-logo" />
                    <h1>BENEFIT TOKEN(ERC20)</h1>
                    <p>
                        Examples of how to get started with Drizzle in various situations.
                    </p>
                </div>
                <div className="section">
                    <h2>Using web3</h2>
                    <strong>balance of 0 order  </strong>
                    <p>{`${this.balance}`}</p>
                </div>
                <div className="section">
                    <h2>Active Account</h2>
                    <h3 style={{color: "red"}}>{`${selectedAddress}`}</h3>
                    <h2>Current Account</h2>
                    <AccountData
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                        accountIndex={0}
                        units="ether"
                        precision={3}
                    />
                </div>

                <div className="section">
                    <h2>Benefit Token</h2>
                    <p>
                        Here we have a form with custom, friendly labels. Also note the token
                        symbol will not display a loading indicator. We've suppressed it with
                        the <code>hideIndicator</code> prop because we know this variable is
                        constant.
                    </p>
                    <p>
                        <strong>Total Supply: </strong>
                        <ContractData
                            drizzle={this.props.drizzle}
                            drizzleState={this.props.drizzleState}
                            contract="BenefitToken"
                            method="totalSupply"
                            methodArgs={[{ from: selectedAddress }]} // 요개 항상 Current Account 다
                        />{" "}
                        <ContractData
                            drizzle={this.props.drizzle}
                            drizzleState={this.props.drizzleState}
                            contract="BenefitToken"
                            method="symbol"
                            hideIndicator
                        />
                    </p>
                    <p>
                        <strong>My Balance: </strong>
                        <ContractData
                            drizzle={this.props.drizzle}
                            drizzleState={this.props.drizzleState}
                            contract="BenefitToken"
                            method="balanceOf"
                            methodArgs={[selectedAddress]}
                        />
                    </p>
                    <h3>Send Tokens</h3>
                    <ContractForm
                        drizzle={this.props.drizzle}
                        contract="BenefitToken"
                        method="transfer"
                        labels={["To Address", "Amount to Send"]}
                    />
                    <h3>Transfer From</h3>
                    <ContractForm
                        drizzle={this.props.drizzle}
                        contract="BenefitToken"
                        method="transferFrom"
                        labels={["Sender", "To Address", "Amount to Send"]}
                    />
                    <i> 대신 보내주는 기능이다. Sender 보내는 사람 To Address 받는사람 예를 들면 A 가 B의 토큰을 C로 전송 시킬수 있다.</i>


                    <h3>Increase Allowance</h3>
                    <ContractForm
                        drizzle={this.props.drizzle}
                        contract="BenefitToken"
                        method="increaseAllowance"
                        labels={["Spender", "addedValue"]}
                    />
                    <i> 대신 보낼 수량을 지정한다. 제 삼자는 지정된 수량만 대신 보낼 수 있다. </i>

                    <h3>Allowance</h3>
                    <form>
                        <input
                            placeholder="spender"
                            value={this.state.spender}
                            onChange={this.handleChange}
                        />
                    </form>
                    <p>{`Allowance Count : ${this.allowanceVal}`}</p>
                    <p>{`owner ${selectedAddress}`}</p>
                    <p>{`spender ${this.state.spender}`}</p>
                    <i> 대신 보낼 수량을 조회 한다. </i>

                    <h3>Benefit</h3>
                    <Benefit
                        drizzle={this.props.drizzle}
                        drizzleState={this.props.drizzleState}
                    />

                </div>

                <div className= "section">
                    <h2>Ohter Accounts  </h2>
                    <Accounts drizzle={this.props.drizzle} drizzleState={this.props.drizzleState}>

                    </Accounts>

                </div>

            </div>
        )
    }
}

export default MainComponent;
