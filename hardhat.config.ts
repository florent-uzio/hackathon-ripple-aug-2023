import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const PRIVATE_ACCOUNT_KEY = process.env.PRIVATE_KEY ?? "";

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  // This is the XRPL EVM Sidechain network details
  networks: {
    evm: {
      url: "https://rpc-evm-poa-sidechain.peersyst.tech",
      chainId: 1440002,
      accounts: [PRIVATE_ACCOUNT_KEY],
    },
  }
};

export default config;
