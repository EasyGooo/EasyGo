import React, { Component } from 'react'
import Nav from '../../../Nav/Nav.js'
import UserInfo from '../UserInfo/UserInfo.js'
import ProfileNav from '../ProfileNav/ProfileNav.js'
import AuthService from '../../../../Service/AuthService.js'

export default class Trips extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
    this.authService = new AuthService();
  }
  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => 
        this.setState({ ...this.state, imgPath:user.imgPath , username:user.username}))
     
  };
  render() {
    return (
      <div>
        <Nav />
        <div className='profile-info-cont'>
          <UserInfo image={this.props.getImage} name={this.props.getName}/>
          <div className='profile-content'></div>
          <ProfileNav/> 
        </div>
        <p>trips</p>
      </div>
    )
  }
}
