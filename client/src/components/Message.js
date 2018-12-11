import React, { Component } from 'react'

export default class Message extends Component {
  render() {
    const message = this.props.user ? <p>Hola usuario</p> : <p>Hola no usuario</p>
    return (
      <div>
        {message}
      </div>
    )
  }
}
