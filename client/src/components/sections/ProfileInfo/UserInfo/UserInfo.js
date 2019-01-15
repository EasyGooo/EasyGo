import React, { Component } from 'react'

export default class UserInfo extends Component {
  render() {
    return (
      <div>
         <div className='user-info-container'>
            <img className='user-image-profile' src={this.props.image} alt=""/>
            <h1 className='user-name-profile'>{this.props.name}</h1>
          </div>
      </div>
    )
  }
}
