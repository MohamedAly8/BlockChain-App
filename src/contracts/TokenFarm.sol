pragma solidity >=0.5.0;

import "./DappToken.sol";
import "./DaiToken.sol";

//Deployment:
// Step 1: Deploy DAI
// Step 2: Deploy DAPP
// Step 3: Deploy TokenFarm
contract TokenFarm {
    // state variable to be stored on BlockChain
    string public name = "Dapp Token Farm";

    DappToken public dappToken;
    DaiToken public daiToken;

    // only run once
    // Assign variables to be state variables
    constructor(DappToken _dappToken, DaiToken _daiToken) public {
        // store reference to Dapp / DAI token that are deployed to the network
        // assume DAI/DAPP already deployed, fetch their address
        dappToken = _dappToken;
        daiToken = _daiToken;

    }
}
