import './App.css';
import Link from '@mui/material/Link';
import Header from './Header';
import Main from './Main';
import styled from 'styled-components';


const Home = () =>{

  return (
      <div className="App">
        <header className="App-header grid-container">
          <Header/>
        </header>
        <body style={{"display": "flex", "margin": "80px"}}>
          <Main/>
        </body>
      </div>
  );
}

export default Home;
