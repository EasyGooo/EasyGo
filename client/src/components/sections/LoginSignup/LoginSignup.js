import React, { Component } from 'react'
import Login from '../../auth/Login'
import Signup from '../../auth/Signup'
import { Route, Link, Switch, Redirect, Router } from "react-router-dom";

export default class LoginSignup extends Component {
  render() {
    
    return (
      <div>
        <div className='loginSignupBody'>
				<img className='logo' src="../../../../images/EasyGo-white.svg" alt=""/>
				<h1 className='easy-go'>easy go</h1>

        <Link className='button btn-log' to='/login'>Log in</Link>
				<Link className='button btn-sign' to='/singup'>Sing up</Link>
				</div>

      </div>
    )
  }
}
