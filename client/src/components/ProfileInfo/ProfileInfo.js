import React, { Component } from 'react'
import AuthService from '../auth/AuthService';

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
        
         <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="password" name="password" onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="text" name="email" onChange={e => this.handleChange(e)} />

          <input type="submit" value="Change"/>
        </form>

        
      </div>
    )
  }
}
