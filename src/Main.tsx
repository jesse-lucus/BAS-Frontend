import {useState, useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import { useWeb3React } from "@web3-react/core";

import { injected, walletConnect, trustWallet, binance_wallet } from "./utils/helpers/connectors";
import MetaMaskImg from "./assets/metamask.png";
import Coin98Img from "./assets/coin98.png";
import CoinbaseImg from "./assets/coinbase.svg";
import WalletConnectImg from "./assets/walletConnect.svg";

import logo from './logo.svg';
import './App.css';

import { userAction } from './utils/helpers/userAction';
import VerifySignatureEVM from './utils/helpers/signWallet';

import useNear from "./hooks/useNear";
import { sha256 } from "js-sha256";

import { getSolanaProvider, PhantomProvider } from "./solana/utils";

function Main() {
  let history = useHistory();

  const handleClose = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [provider, setSolanaProvider] = useState<PhantomProvider | undefined>(undefined);
  const [solanaKey, setSolanaWalletKey] = useState("");

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
  const { account, activate, library } = useWeb3React();
  const {signIn, wallet} = useNear();
  const { signMessageEVM } = VerifySignatureEVM();

  ///Connect Solana Wallet
  const connectSolanaWallet = async () => {
    // @ts-ignore
    const { solana } = window;

    if (solana) {
      try {
        const response = await solana.connect();
        console.log('wallet account ', response.publicKey.toString());
        setSolanaWalletKey(response.publicKey.toString());
      } catch (err) {
       // { code: 4001, message: 'User rejected the request.' }
      }
    }
  };
  
  const handleConnect = async (currentConnector:ConnectorNames) => {
    console.log("wallet", walletConnectors[currentConnector]);
    const current = currentConnector;
    await activate(walletConnectors[current]);
    window.localStorage.setItem("CurrentWalletConnect", currentConnector);
    console.log(account, library);
    handleClose();
  };

  const sendSignMessageEVM = async () => {
    const signData = signMessageEVM(library);
    const email = localStorage.getItem("email");
    if((await signData).signature)
    {
      if(email)
      {
        // await userAction.addWallet(email, (await signData).address, (await signData).signature)?.then(result => {
        //   if(result.success) {
        //       console.log("Successed");
        //   }
        // });
      }
    }
  }

  const sendSignMessageSolana = async () => {
    const message_from_backend = 'hello world'
    if ("solana" in window && provider) {
      const signResult = provider
      .signMessage(
        new TextEncoder().encode(message_from_backend),
        'utf8'
      );
      console.log(signResult);
    }
  }

  const sendSignMessageNear =async () => {
    const message = new Uint8Array(sha256.array("message"));
    const keypair = await wallet?._keyStore.getKey("mainnet", wallet.getAccountId());
    if(keypair) {
      const signature = keypair.sign(message);
      console.log(signature);
    }
  }

  useEffect(() => {
    ///ETH Wallet
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
    ///Solana Wallet
    const provider = getSolanaProvider();
    if (provider) setSolanaProvider(provider);
    else setSolanaProvider(undefined);

    let token_ = localStorage.getItem("token");
    setToken(token_);
  }, []);

  return(
    <>
    {token == "undefined" ? <>
      {console.log("token", token)}
      <div style={{"width": "50%"}}>
        <TextBox1>
          The future of money is promising.
        </TextBox1>
        <TextBox2>
        <p>Vow
          <TextBox2_1>®</TextBox2_1>
          <TextBox2_2>&nbsp;eliminates the cost of refunds and rewards for retailers.
          </TextBox2_2>
          </p>
        </TextBox2>
        <Link href="/signin" variant="body2">
            {"Login"}
        </Link>
        <Link href="/signup" variant="body2">
            {"Don't have an account? Sign Up"}
        </Link>
      </div>
      <div style={{"width": "50%", "alignItems": "center", "justifyContent": "flex-end", "display": "flex"}}>
        <Button1 onClick={() => {
          history.push('/signup');
        }}>
          Login/Signup
        </Button1>
      </div>  
    </> : <>
      {console.log("token", token)}
      <div style={{"width": "50%"}}>
        <TextBox1>
          The future of money is promising.
        </TextBox1>
        <TextBox2>
          <p>
            Vow®eliminates the cost of refunds and rewards for retailers.
          </p>
        </TextBox2>
      </div>
      <div style={{"width": "50%", "alignItems": "center", "justifyContent": "flex-end", "display": "grid"}}>
        {
          account ? 
          <>
            <Button1 onClick={sendSignMessageEVM}>Sign ETH Wallet</Button1>
            <p>{account}</p>
          </> :
          <>
            <Button1 onClick={() => setOpen(true)}>Connect ETH Wallet</Button1>
            <p>Not Connected</p>
          </>
        }
        {
          wallet ? 
          <>
            <Button1 onClick={sendSignMessageNear}>Sign Near Wallet</Button1>
            <p>{wallet.getAccountId()}</p>
          </> :
          <>
            <button onClick={signIn}>Connect Near Wallet</button>
            <p>Not Connected</p>
          </>
        }
        {
          solanaKey ? 
          <>
            <Button1 onClick={sendSignMessageSolana}>Sign Solana Wallet</Button1>
            <p>{solanaKey}</p>
          </> :
          <>
            <Button1 onClick={connectSolanaWallet}>Connect Solana Wallet</Button1>
            <p>Not Connected</p>
          </>
        }
      </div>
      
    {/* <>
      <Box maxWidth={"1440px"} width={"100%"} display={"flex"} flexDirection={"column"} alignItems="center" boxSizing={"border-box"} sx={{ px: { xs: "24px", sm: "64px", md: "108px" } }}>
        
      </Box>
    </> */}
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
    </>}
    </>
  )
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

const TextBox1 = styled.h3`
  color: #000000;
  font-size: 65px;
  font-weight: 800;
  line-height: 1em;
  padding: 0;
  margin: 0;
  word-wrap: break-word;
`

const ElementRow = styled(Box)`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`

const TextBox2 = styled(Box)`
  color: #424242;
  font-size: 19px;
  font-weight: 400;
  word-wrap: break-word;
`

const TextBox2_1 = styled(Box)`
  color: #202124; 
  font-size: 14px; 
  font-variant-ligatures: normal; 
  orphans: 2; 
  widows: 2; 
  text-decoration-thickness: 
  initial;
`

const TextBox2_2 = styled(Box)`
  font-family: var( --e-global-typography-text-font-family ), Sans-serif;
`

const Button1 = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 56px;
  font-style: normal;
  line-height: 17px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;

  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  letter-spacing: -0.5px;
  fill: #000000;
  color: #000000;
  background-color: #F8D200;
  border-radius: 5px 5px 5px 5px;
  padding: 14px 32px 14px 32px;

  color: #FFFFFF;
  &:hover{
      transition: .3s;
      background-color: #512efd;
  }
`

export default Main;
