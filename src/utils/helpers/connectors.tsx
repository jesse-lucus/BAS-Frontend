import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { ethers } from "ethers";

// const IS_MAINNET = process.env.REACT_APP_NETWORK === 'mainnet';
const IS_MAINNET = false;
const chainId = IS_MAINNET? 56 : 4;
const rpcUrl = IS_MAINNET? "https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161" : "https://eth-rinkeby.alchemyapi.io/v2/w7Ba7kuREEMqrKRr2roEOhSHidOVRK5Y/";
const scanUrl = IS_MAINNET? "https://testnet.bscscan.com/" : "https://rinkeby.etherscan.io/";

const BINANCE_MAINNET_PARAMS = {
  chainId: chainId,
  chainName: "Ether",
  nativeCurrency: {
    name: "Ether",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: [rpcUrl],
  blockExplorerUrls: [scanUrl],
};

const injected = new InjectedConnector({ supportedChainIds: [chainId] });
const binance_wallet = new InjectedConnector({
  supportedChainIds: [Number(BINANCE_MAINNET_PARAMS.chainId)],
});
const trustWallet = new InjectedConnector({
  supportedChainIds: [Number(BINANCE_MAINNET_PARAMS.chainId)],
});

const walletConnect = new WalletConnectConnector({
  rpc: {
    56: "https://bsc-dataseed.binance.org/",
    4: "https://eth-rinkeby.alchemyapi.io/v2/w7Ba7kuREEMqrKRr2roEOhSHidOVRK5Y/",
  },
  bridge: "https://bridge.walletconnect.org/",
  qrcode: true,
});

export const getLibrary = (provider:any) => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export { injected, trustWallet, walletConnect, binance_wallet };
