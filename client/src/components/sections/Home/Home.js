import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'

export default class Home extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  
  render() {
    console.log("Holita Pepe")
    return (
      <div>
         
        <Nav />
        <h1>HOME</h1>
      </div>
    )
  }
}
