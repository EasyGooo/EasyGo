import React, { Component } from 'react';
import AuthService from './AuthService';
import {Redirect} from "react-router-dom";

export default class Signup extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      photo: '',
      redirect: false
    }

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {username, password, photo} = this.state;

    this.authService.signup({username, password, photo})
    .then(user => {
      this.props.getUser(user)
      this.setState({username: '', password: '', photo: '', redirect: true})
    });
  }

  handleChange = (e) => {
    const {name, value} = e.target;

    if(name == "photo") {
      this.setState({...this.state, photo: e.target.files[0]})
    } else {
      this.setState({...this.state, [name]: value});
    }
  }

  render() {
    if(this.state && this.state.redirect) {
      return <Redirect to="/" />
    }

    return (
      <div>
        <h2>Signup</h2>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username</label>
          <input type="text" name="username" onChange={e => this.handleChange(e)} />

          <label>Password</label>
          <input type="password" name="password" onChange={e => this.handleChange(e)} />

          <label>Photo</label>
          <input type="file" name="photo" onChange={e => this.handleChange(e)} />

          <input type="submit" value="Signup"/>
        </form>
      </div>
    )
  }
}
