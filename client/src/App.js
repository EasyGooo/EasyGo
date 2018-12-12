import React, { Component } from "react";
import "./App.css";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Message from "./components/Message";
import AuthService from "./components/auth/AuthService";
import { Route, Link } from "react-router-dom";
import ProfileInfo from "./components/ProfileInfo/ProfileInfo";
import GoogleMapsComponent from './components/Mapas/GoogleMapsComponent'
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
        <button onClick={this.logout}>Logout</button>
      </div>
    ) : (
      <div>
        <p>No user</p>
        <Link to="/">Home</Link> - <Link to="/signup">Signup</Link> -{" "}
        <Link to="/login">Login</Link>-<Link to="/profile">Profile</Link>
      </div>
    );

    return (
      <div className="App">
        {welcome}
        <Message user={this.state.user} />
        <Route path="/signup" render={() => <Signup getUser={this.getUser} />}/>
        <Route path="/login" render={() => <Login getUser={this.getUser} />} />
        <Route path="/profile" render={() => <ProfileInfo getUser={this.getUser} />} />
        {/* <GoogleMapsComponent
        currentLatitude={-22.923049} 
        currentLongitude={-43.373979}
        destinationLatitude={-22.997345}
        destinationLongitude={-43.358052}
    /> */}
    <Mapas/>
     
      </div>
    );
  }
}

export default App;
