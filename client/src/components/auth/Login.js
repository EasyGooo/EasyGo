import React, { Component } from 'react';
import AuthService from '../../Service/AuthService';
import {Link} from "react-router-dom";
export default class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    }

    this.authService = new AuthService();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const {username, password} = this.state;

    this.authService.login({username, password})
    .then(user => this.props.getUser(user));
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }


  render() {
    
    return (
      <div>
        <div className='loginSignupBody'>
        <div className='back-btn'>
        <Link to='/' className="button-circle">

        <i className="button-circle__icon fa fa-arrow-right" data-feather="chevron-right"></i>
       

        </Link>
      </div>
        <img className='logo' src="../../../../images/EasyGo-white.svg" alt=""/>
       
        <form className='center-form' onSubmit={this.handleFormSubmit}>
       
         
          <input className='inputs-form' placeholder='username' type="text" name="username" onChange={e => this.handleChange(e)} />

          <input className='inputs-form' placeholder='password' type="password" name="password" onChange={e => this.handleChange(e)} />

          <input className='button submit-log' type="submit" value="Login"/>
        </form>
      </div>      
      </div>
    )
  }
}
