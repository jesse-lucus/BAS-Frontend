import React, {useState, useEffect} from 'react';
import { Router, Route, BrowserRouter } from 'react-router-dom'
import Link from '@mui/material/Link';
import Button from '@mui/material'
import StyledInternalLink from './Component/Links/Links';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";
import { Box, Modal } from "@material-ui/core";
import { injected, walletConnect, trustWallet, binance_wallet } from "./utils/helpers/connectors";
import useWallet from './utils/helpers/useWallet';
import MetaMaskImg from "./assets/metamask.png";
import Coin98Img from "./assets/coin98.png";
import CoinbaseImg from "./assets/coinbase.svg";
import WalletConnectImg from "./assets/walletConnect.svg";
import logo from './logo.svg';
import './App.css';
import { userAction } from './utils/helpers/userAction';

function Main() {
    let token = localStorage.getItem("token");
    console.log(token);

    const connectWallet = () =>{
        setOpen(true);
    }

    const handleClose = () => setOpen(false);
    const [open, setOpen] = useState(false);
    const [wConnect, set_wConnect] = useState();
    const { signMessage } = useWallet()
  
    enum ConnectorNames {
        MetaMask = "injected",
        WalletConnect = "walletconnect",
        BinanceWallet = "binance_wallet",
        TrustWallet = "trustWallet"
    }
    
  
    const DESKTOP_CONNECTORS: { [connectorName in ConnectorNames]: any } = {
      [ConnectorNames.MetaMask]: injected,
      [ConnectorNames.WalletConnect]: walletConnect,
      [ConnectorNames.BinanceWallet]: binance_wallet,
      [ConnectorNames.TrustWallet]: trustWallet,
    }

    const walletConnectors = DESKTOP_CONNECTORS;
    const { account, activate } = useWeb3React();
    
    const handleConnect = async (currentConnector:ConnectorNames) => {
      console.log("wallet", walletConnectors[currentConnector]);
      const current = currentConnector;
      await activate(walletConnectors[current]);
      set_wConnect(walletConnectors[current]);
      window.localStorage.setItem("CurrentWalletConnect", currentConnector);
      handleClose();
    };

    const sendSignMessage = async () => {
      const signData = signMessage();
      const email = localStorage.getItem("email");
      if((await signData).signature)
      {
        if(email)
        {
          await userAction.addWallet(email, (await signData).address, (await signData).signature)?.then(result => {
            if(result.success) {
                console.log("Successed");
            }
          });
        }
      }
    }
  
    useEffect(() => {
      const currentWalletState = window.localStorage.getItem("CurrentWalletConnect");
      if(currentWalletState)
      {
        if(currentWalletState == "MetaMask")
          activate(walletConnectors[ConnectorNames.MetaMask]);
        else if(currentWalletState == "walletconnect")
            activate(walletConnectors[ConnectorNames.WalletConnect]);
        else if(currentWalletState == "binance_wallet")
            activate(walletConnectors[ConnectorNames.BinanceWallet]);
        else if(currentWalletState == "trustWallet")
            activate(walletConnectors[ConnectorNames.TrustWallet]);
                
      }
    }, []);

    if(token)
    {
        return (
            <>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Welcome.
                </p>
                {!wConnect && <button onClick={connectWallet}>Connect Wallet</button>}
                {wConnect && (<>
                  <p>{account}</p>
                  <button onClick={sendSignMessage}>Sign Wallet</button>
                </>
                )}
              </header>
            </div>
            <>
                <Box maxWidth={"1440px"} width={"100%"} display={"flex"} flexDirection={"column"} alignItems="center" boxSizing={"border-box"} sx={{ px: { xs: "24px", sm: "64px", md: "108px" } }}>
                  <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                    <ModalBox>
                      <UpText>Select Wallet</UpText>
                      <DownText>Connect to the site below with one of our available wallet providers.</DownText>
                      <ConnectPart>
                        <ConnectWallet
                          onClick={() => {
                            handleConnect(ConnectorNames.MetaMask);
                          }}
                        >
                          <Box display={"flex"} marginLeft={"5%"}>
                            Metamask
                          </Box>
                          <Box display={"flex"} marginRight={"5%"}>
                            <img src={MetaMaskImg} width={"24px"} height={"24px"} alt="" />
                          </Box>
                        </ConnectWallet>
                        <ConnectWallet
                          onClick={() => {
                            handleConnect(ConnectorNames.TrustWallet);
                          }}
                        >
                          <Box display={"flex"} marginLeft={"5%"}>
                            Coinbase Wallet
                          </Box>
                          <Box display={"flex"} marginRight={"5%"}>
                            <img src={CoinbaseImg} width={"24px"} height={"24px"} alt="" />
                          </Box>
                        </ConnectWallet>
                        <ConnectWallet
                          onClick={() => {
                            handleConnect(ConnectorNames.WalletConnect);
                          }}
                        >
                          <Box display={"flex"} marginLeft={"5%"}>
                            WalletConnect
                          </Box>
                          <Box display={"flex"} marginRight={"5%"}>
                            <img src={WalletConnectImg} width={"24px"} height={"24px"} alt="" />
                          </Box>
                        </ConnectWallet>
                        <ConnectWallet
                          onClick={() => {
                            handleConnect(ConnectorNames.MetaMask);
                          }}
                        >
                          <Box display={"flex"} marginLeft={"5%"}>
                            Coin98
                          </Box>
                          <Box display={"flex"} marginRight={"5%"}>
                            <img src={Coin98Img} width={"24px"} height={"24px"} alt="" />
                          </Box>
                        </ConnectWallet>
                      </ConnectPart>
                    </ModalBox>
                  </Modal>
                </Box>
              </>
            </>
            
          );
    } else{
        return (
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                  Please Login first.
                </p>
                <Link href="/signin" variant="body2">
                    {"Login"}
                </Link>
                <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                </Link>
              </header>
            </div>
          );
    }
}

const ConnectWallet = styled(Box)`
  display: flex;
  width: 100%;
  flex: 1;
  margin-top: 2%;
  margin-bottom: 2%;
  justify-content: space-between;
  align-items: center;
  background: #f1f3f5;
  border-radius: 8px;
  &:hover {
    cursor: pointer;
    transition: 0.3s;
    background: #e1e3e5;
  }
`;

const ConnectPart = styled(Box)`
  display: flex;
  flex: 4;
  flex-direction: column;
  font-family: "Inter", sans-serif !important;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.01em;
  color: #05070c;
`;

const UpText = styled(Box)`
  display: flex;
  flex: 1;
  align-items: center;
  font-family: "Inter", sans-serif !important;
  font-style: normal;
  letter-spacing: -0.01em;
  font-weight: 600;
  font-size: 24px;
  line-height: 100%;
  color: #05070c;
`;
const DownText = styled(Box)`
  display: flex;
  flex: 1;
  align-items: flex-start;
  font-weight: 400;
  font-size: 16px;
  line-height: 120%;
  font-family: "Inter", sans-serif !important;
  font-style: normal;
  letter-spacing: -0.01em;
  color: #05070c;
`;

const ModalBox = styled(Box)`
  display: flex;
  width: 350px;
  height: 400px;
  flex-direction: column;
  background-color: #d4eee9;
  border: none;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  backdrop-filter: blur(100px) !important;
  border-radius: 20px !important;
  padding: 30px;
  transition: box-shadow 300ms;
  transition: transform 505ms cubic-bezier(0, 0, 0.2, 1) 0ms !important;
  outline: none;
  animation: back_animation1 0.5s 1;
  animation-timing-function: ease;
  animation-fill-mode: forwards;
  @keyframes back_animation1 {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
  }
`;

export default Main;
