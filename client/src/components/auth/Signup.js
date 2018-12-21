import React, { Component } from 'react';
import AuthService from '../../Service/AuthService';
import {Redirect} from "react-router-dom";

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      photo: '',
      email:'',
      redirect: false
    }

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {username, password, photo, email} = this.state;

    this.authService.signup({username, password, photo, email})
    .then(user => {
      this.props.getUser(user)
      this.setState({username: '', password: '', photo: '', email:'',redirect: true})
    });
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    if(name === "photo") {
      this.setState({...this.state, photo: e.target.files[0]})
    } else {
      this.setState({...this.state, [name]: value});
    }
  }

  render() {
    if(this.state && this.state.redirect) {
      return <Redirect to="/login" />
    }

    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleFormSubmit}>
        
          <input type="text" name="username" onChange={e => this.handleChange(e)} />

         
          <input type="password" name="password" onChange={e => this.handleChange(e)} />

          
          <input type="text" name="email" onChange={e => this.handleChange(e)} />

          <input type="file" name="photo" onChange={e => this.handleChange(e)} />

          <input type="submit" value="signup"/>
        </form>
      </div>
    )
  }
}
