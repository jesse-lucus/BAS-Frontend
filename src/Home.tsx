import React from 'react';
import logo from './logo.svg';
import './App.css';
import Link from '@mui/material/Link';
import StyledInternalLink from './Component/Links/Links';
import { WalletProvider, ConnectionProvider, useWallet, WalletContextState } from '@solana/wallet-adapter-react';
import * as sol_wallet from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as anchor from '@project-serum/anchor';

const Home = () =>{
  const network = "testnet";
  const wallets = [new sol_wallet.PhantomWalletAdapter()];

  const rpcHost = "https://api.testnet.solana.com";
  const connection = new anchor.web3.Connection(rpcHost
    ? rpcHost
    : anchor.web3.clusterApiUrl('testnet'));

  return (
    <ConnectionProvider endpoint='https://api.testnet.solana.com'>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <p>
                Welcome
              </p>
              <Link href="/signin" variant="body2">
                  {"Login"}
              </Link>
              <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
              </Link>
            </header>
          </div>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default Home;
