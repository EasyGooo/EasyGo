import React, { Component } from "react";
import "./App.css";
import "./styles.scss"
import { Route, Link, Switch, Redirect, Router } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/sections/Home/Home.js";
import AuthService from "./Service/AuthService";
import ProfileInfo from "./components/sections/ProfileInfo/ProfileInfo";
import Join from './components/sections/Join/Join.js';
import Askstop from './components/sections/Askstop/Askstop.js';
import JourneySelected from './components/JourneySelected/JourneySelected.js';
import Create from './components/sections/Create/Create.js';
import LoginSignup from './components/sections/LoginSignup/LoginSignup.js';
import Notifications from './components/sections/Notifications/Notifications';

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
        
 
       
        <Link to='/login' className='logout' onClick={this.logout}>Logout</Link>

 

         
      </div>
    ) : (
      <div>
       
      </div>
    );

    return (
      <div className="App">
 {welcome}
        {/* <p>Hola {this.state.user.username}</p> */}
        <Switch>
          <Route exact path="/singup" render={() => <Signup getUser={this.getUser} />} />  
          <Route exact path="/login" render={() => <Login getUser={this.getUser} />} />  
          <Route exact path="/" render={() => <LoginSignup getUser={this.getUser} />} />
         
          <Route path="/join" render={() => <Join getUser={this.getUser} />} />  
          <Route path="/create" render={() => <Create getUser={this.getUser}/>}/>
          <Route path="/signup" render={() => <Signup getUser={this.getUser} />}/>
          <Route path="/profile" render={() => <ProfileInfo image={this.state.user.imgPath} getUser={this.getUser} />} />
          <Route exact path="/journeys/:id" component={JourneySelected}/>
          <Route exact path="/journeys/:id/askstop" component={Askstop}/>
          <Route exact path="/notifications" render={() => <Notifications getUser={this.getUser} />}/>
          <Route path="/askstop" render={() => <Askstop getUser={this.getUser} />}/>
        </Switch>
  
    
      </div>
    );
  }
}

export default App;
