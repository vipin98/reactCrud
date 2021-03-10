import React from 'react'
import logo from './logo.svg';
import './App.css';
import UserRegistration from './components/UserRegistration/UserRegistration'
import AllUsers from './components/AllUsers/AllUsers'
import {} from './components/UserRegistration/UserRegistration'
import Header from './components/Header/Header'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {} from './components/AllUsers/AllUsers'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Header/>
      <Switch>
        <Route exact path="/" component={UserRegistration}/>
        <Route exact path="/AllUsers" component={AllUsers} />
      </Switch>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
