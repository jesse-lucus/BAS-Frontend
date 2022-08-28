import React from 'react';
import logo from './logo.svg';
import './App.css';
import Link from '@mui/material/Link';
import StyledInternalLink from './Component/Links/Links';
import * as anchor from '@project-serum/anchor';

const Home = () =>{

  return (
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
  );
}

export default Home;
