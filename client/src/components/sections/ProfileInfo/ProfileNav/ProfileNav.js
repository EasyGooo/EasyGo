import React, { Component } from 'react'

export default class ProfileNav extends Component {
  render() {

    return (
      <div>
        <nav>
          <Link to='/profile'>About</Link>
          <Link to='/trips'>Trips</Link>
          <Link to='/notifications'>Notifications</Link>
          <Link to='/opinions'>Opinions</Link>
          </nav>
      </div>
    )
  }
}
