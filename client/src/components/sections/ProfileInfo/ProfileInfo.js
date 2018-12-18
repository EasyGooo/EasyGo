import React, { Component } from 'react'
import AuthService from '../../../Service/AuthService.js';
import Nav from '../../Nav/Nav.js'
export default class ProfileInfo extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email:''
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


  render() {
    return (
      <div>
         <Nav />
         <header id='profile-header'><h1>PROFILE</h1></header>
         
        <img src={this.props.image} alt=""/>   
         <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="password" name="password" onChange={e => this.handleChange(e)} />

          <label>Email</label>
          <input type="text" name="email" onChange={e => this.handleChange(e)} />

          <input type="submit" value="Change"/>
        </form>

        
      </div>
    )
  }
}
