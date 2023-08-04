# Smart Contract

This is a hardhat project to deploy solidity smart contract to an EVM network.

The contract used in this application is called `did.sol`.

You can find it in `contracts/did.sol`.

## Installation

1. Run `npm i`.
2. Copy `.env.example` and rename it to `.env`
3. We need to get the private key of your metamask account to deploy the contract. Follow this [link](https://support.metamask.io/hc/en-us/articles/360015289632-How-to-export-an-account-s-private-key) to know how to export the private key from metamask.
4. Paste your exported private key in the `.env` file (the key is called `PRIVATE_KEY`). Make sure there are no space after the `=` sign.

## Deployment

You can deploy the smart contract as is or make any modifications to it.

Then run `npm run deploy-xrpl`. This will deploy to the devnet [XRPL EVM Sidechain](https://opensource.ripple.com/docs/evm-sidechain/intro-to-evm-sidechain/). The EVM Sidechain docs might be moved to xrpl.org in the future.

Once the npm script is run, you should have the new deployed address of the smart contract.

Make sure to update the `VITE_SMART_CONTRACT_ADDRESS` key in `frontend/.env.local`.
