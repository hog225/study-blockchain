import Web3 from "web3";
import BenefitToken from "./contracts/BenefitToken.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://127.0.0.1:7545"),
  },
  contracts: [BenefitToken],
  events: {
    BenefitToken: ["Transfer", "Approval"],
  },
  polls: {
    accounts: 1500,
  }
};

export default options;
