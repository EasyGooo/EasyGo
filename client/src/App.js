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
import Notifications from './components/sections/ProfileInfo/Notifications/Notifications.js';
import Valorations from './components/sections/ProfileInfo/Valorations/Valorations.js';
import Trips from './components/sections/ProfileInfo/Trips/Trips.js';

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
  getUserImage=()=>{
    if(this.state.user === null){
      return 'https://res.cloudinary.com/easy-go/image/upload/v1544540100/easy-go/default-user.png'
    }else{
      return this.state.user.imgPath
    }
  }
  getUserName=()=>{
    if(this.state.user === null){
      return 'User Name'
    }else{
      return this.state.user.username
    }
  }

  render() {
    const welcome = this.state.user ? (
      <div>
        
 
        <div className='logout-block'>
        <Link to='/login' className='logout' onClick={this.logout}>Logout</Link>
        </div>
 

         
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
          <Route path="/profile" render={() => <ProfileInfo getImage={this.getUserImage()} getName={this.getUserName()} />} />
          <Route exact path="/journeys/:id" component={JourneySelected}/>
          <Route exact path="/journeys/:id/askstop" component={Askstop}/>
          <Route exact path="/notifications" render={() => <Notifications getUser={this.getUser} getImage={this.getUserImage()} getName={this.getUserName()}/>}/>
          <Route exact path="/opinions" render={() => <Valorations getUser={this.getUser} getImage={this.getUserImage()} getName={this.getUserName()}/>}/>
          <Route exact path="/trips" render={() => <Trips getUser={this.getUser}  getImage={this.getUserImage()} getName={this.getUserName()} />}/>
          <Route path="/askstop" render={() => <Askstop getUser={this.getUser} />}/>
        </Switch>
  
    
      </div>
    );
  }
}

export default App;
