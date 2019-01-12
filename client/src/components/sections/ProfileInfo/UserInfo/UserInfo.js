import React, { Component } from 'react'

export default class UserInfo extends Component {
  render() {
    return (
      <div>
         <div className='user-info-container'>
            <img src={this.props.image} alt=""/>
            <h1></h1>
          </div>
      </div>
    )
  }
}
