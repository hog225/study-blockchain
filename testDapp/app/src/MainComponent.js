import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
    // destructure drizzle and drizzleState from props
    return (
        <div className="App">
            <ToastContainer />
            <div>
                <img src={logo} alt="drizzle-logo" />
                <h1>BENEFIT TOKEN</h1>
                <p>
                    Examples of how to get started with Drizzle in various situations.
                </p>
            </div>
            <div className="section">
                <h2>Active Account</h2>
                <AccountData
                    drizzle={drizzle}
                    drizzleState={drizzleState}
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
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="BenefitToken"
                        method="totalSupply"
                        methodArgs={[{ from: drizzleState.accounts[0] }]}
                    />{" "}
                    <ContractData
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="BenefitToken"
                        method="symbol"
                        hideIndicator
                    />
                </p>
                <p>
                    <strong>My Balance: </strong>
                    <ContractData
                        drizzle={drizzle}
                        drizzleState={drizzleState}
                        contract="BenefitToken"
                        method="balanceOf"
                        methodArgs={[drizzleState.accounts[0]]}
                    />
                </p>
                <h3>Send Tokens</h3>
                <ContractForm
                    drizzle={drizzle}
                    contract="BenefitToken"
                    method="transfer"
                    labels={["To Address", "Amount to Send"]}
                />
                <h3>Allowance</h3>
                {/*<ContractData*/}
                {/*    drizzle={drizzle}*/}
                {/*    drizzleState={drizzleState}*/}
                {/*    contract="BenefitToken"*/}
                {/*    method="allowance"*/}
                {/*    methodArgs={[{ owner: drizzleState.accounts[0], spender: drizzleState.accounts[0]}]}*/}
                {/*/>*/}
            </div>

        </div>
    );
};
