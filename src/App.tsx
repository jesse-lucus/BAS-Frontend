import React, {useState, useEffect} from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Main from './Main';
import Header from './Header';
import './App.css';

const App:React.FC = () => {
  const history = createBrowserHistory();

  return (
    <>
      <div className="App">
        <header className="App-header grid-container">
          <Header/>
        </header>
        <body style={{"display": "flex", "margin": "80px"}}>
          <Router history={history}>
            <Route path="/" exact><Main/></Route>
            <Route path="/signin"><SignIn/></Route>
            <Route path="/signup"><SignUp/></Route>
            {/* <Route path="/main"><Main/></Route> */}
          </Router>
        </body>
      </div>

    </>
  );
}

export default App;
