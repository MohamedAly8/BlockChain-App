 // Importing tokens

const { assert } = require("chai")
const { default: Web3 } = require("web3")
const { contracts_build_directory } = require("../truffle-config")

// eslint-disable-next-line no-undef
const DappToken = artifacts.require('DappToken')
// eslint-disable-next-line no-undef
const DaiToken = artifacts.require('DaiToken')
// eslint-disable-next-line no-undef
const TokenFarm = artifacts.require('TokenFarm')

require("chai")
 .use(require('chai-as-promised'))
 .should()


function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
    let daiToken, dappToken, tokenFarm

    before(async () => {
        // Load contracts
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address)

        // Transfer all Dapp toekns to farm (1 million)
        await dappToken.transfer(tokenFarm.address, tokens('1000000'))

        // Send tokens to investor
        await daiToken.transfer(investor, tokens('100'), {from: owner})

    })


    describe('Mock DAI deployment', async () => {
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    })

    describe('Dapp deployment', async () => {
        it('has a name', async () => {
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    })

    describe('Token Farm deployment', async () => {
        it('has a name', async () => {
            const name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        })
    })

    it('contract has tokens', async () => {

        let balance = await dappToken.balanceOf(tokenFarm.address)
        assert.equal(balance.toString(), tokens('1000000'))

    })
})