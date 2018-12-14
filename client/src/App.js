import React, { Component } from "react";
import "./App.css";
import "./styles.scss"
import { Route, Link, Switch, Redirect, Router } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/sections/Home/Home.js";
import AuthService from "./components/auth/AuthService";
import ProfileInfo from "./components/sections/ProfileInfo/ProfileInfo";
import Join from './components/sections/Join/Join.js'
import Create from './components/sections/Create/Create.js'

import Mapas from './components/Mapas/Mapas'
class App extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };

    this.authService = new AuthService();

    this.fetchUser();
  }

  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => this.setState({ ...this.state, user }));
  };

  getUser = user => {
    this.setState({ ...this.state, user });
  };

  logout = () => {
    this.authService
      .logout()
      .then(() => this.setState({ ...this.state, user: null }));
  };

  render() {
    const welcome = this.state.user ? (
      <div>
        <p>Hola {this.state.user.username}</p>
        <p>Hola {this.state.user.email}</p>

        <button onClick={this.logout}>Logout</button>

        <Redirect to='/home' />

         
      </div>
    ) : (
      <div>
        <p>No user</p>
      </div>
    );

    return (
      <div className="App">

        {/* <p>Hola {this.state.user.username}</p> */}
        <Switch>
          <Route exact path="/" render={() => <Login getUser={this.getUser} />} />
          <Route path="/home" component={Home}/>
          <Route path="/join" component={Join}/>
          <Route path="/create" component={Create}/>
          <Route path="/signup" render={() => <Signup getUser={this.getUser} />}/>
          <Route path="/profile" render={() => <ProfileInfo getUser={this.getUser} />} />
        </Switch>
  
    <Mapas/>

      </div>
    );
  }
}

export default App;
