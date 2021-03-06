import React, { Component } from 'react'
import AuthService from '../../../Service/AuthService.js';
import Nav from '../../Nav/Nav.js'
import UserInfo from './UserInfo/UserInfo.js'
import ProfileNav from './ProfileNav/ProfileNav.js'

export default class ProfileInfo extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email:'',
      user:null
    }
 
    this.authService = new AuthService();
    
  }


  handleFormSubmit = (e) => {
    e.preventDefault();

    const {username, password, email} = this.state;

    this.authService.change({username, password, email})
    .then(user => this.props.getUser(user));
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    this.setState({[name]: value});
  }

  getUserImage=()=>{
    if(this.props.getUser === null){
      return 'defaultimage'
    }else{
      return this.props.imgPath
    }
  }
  render() {
  
    console.log(this.props.getImage)
    return (
      <div>
          <Nav />
          <div className='profile-info-cont'>
            <UserInfo image={this.props.getImage} name={this.props.getName}/>
            <form className='profile-content' onSubmit={this.handleFormSubmit}>
              <h1 className='input-1' >Settings</h1>
              <input className='change-input' placeholder='username' type="text" name="username" onChange={e => this.handleChange(e)} />
              <input className='change-input' placeholder='password' type="password" name="password" onChange={e => this.handleChange(e)} />
              <input className='change-input' placeholder='email' type="text" name="email" onChange={e => this.handleChange(e)} />
              <input className='submit-changes' type="submit" value="Edit"/>
            </form>
            <ProfileNav/>
          </div>        
      </div>
    )
  }
}
