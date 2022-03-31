import React, {useState, useEffect} from 'react';
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import SignIn from './SignIn';
import SignUp from './SignUp';
import Home from './Home';
import Main from './Main';

const App:React.FC = () => {
  const history = createBrowserHistory();

  return (
    <>
      <Router history={history}>
          <Route path="/" exact><Home/></Route>
          <Route path="/signin"><SignIn/></Route>
          <Route path="/signup"><SignUp/></Route>
          <Route path="/main"><Main/></Route>
      </Router>
    </>
  );
}

export default App;
