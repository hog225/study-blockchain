//Metamask account
module.exports = function(callback) {

    web3.eth.getAccounts()
        .then((accounts) => {
        web3.eth.sendTransaction({
            from: accounts[2],
            to: "0x042e545830b55D05Eca72868dAb5BCF70Ac863B0",
            value: web3.utils.toWei("10", "ether")
        }, (e, r) => callback());
        })
        .catch((error) => console.log(error));

}
