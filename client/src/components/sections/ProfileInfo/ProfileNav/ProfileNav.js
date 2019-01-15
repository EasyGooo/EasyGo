import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export default class ProfileNav extends Component {
  render() {

    return (
      <div>
        <nav className='profile-nav'>
          <Link to='/profile' className='profile-links' >  <i className="fa fa-cogs" /> <p className='texthover'>settings</p></Link>
          <Link to='/trips' className='profile-links' >  <i className="fa fa-car" /> <p className='texthover-1 texthover'>trips</p></Link>
          <Link to='/notifications' className='profile-links' >  <i className="fa fa-bell" /> <p className='texthover-1 texthover'>alerts</p></Link>
          <Link to='/opinions' className='profile-links' >  <i className="fa fa-comments" /> <p className='texthover'>opinions</p></Link>
          </nav>
      </div>
    )
  }
}
