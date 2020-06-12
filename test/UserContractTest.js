const assert = require('assert');
const AssertionError = require('assert').AssertionError;
const Web3 = require('web3');

const provider = new Web3.providers.HttpProvider("HTTP://127.0.0.1:7545");
const web3 = new Web3(provider);

const contractCompiled = require('../scripts/compile');

let bytecode =contractCompiled.evm.bytecode.object;
let abi =   contractCompiled.abi;


let accounts;
let usersContract;


beforeEach(async () => {
    accounts = await web3.eth.getAccounts();
    usersContract = await new web3.eth.Contract(abi)
        .deploy({ data: bytecode })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('The UsersContract', async () => {

    it('should deploy', () => {
        console.log(usersContract.options.address);
        assert.ok(usersContract.options.address);
    });

    it('should join a user', async () => {
        let name = "Carlos";
        let surname = "Landeras";

        await usersContract.methods.join(name, surname)
            .send({ from: accounts[0], gas: '500000' });
    });

});