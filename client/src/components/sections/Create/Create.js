import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
export default class Join extends Component {
  render() {
    return (
      <div>
         
         <Nav />
         <h1>Create</h1>

          {/* <input type="" name="" placeholder="" onChange={e => this.handleChange(e)} /> */}
          {/* <input type="" name="" placeholder="" onChange={e => this.handleChange(e)} /> */}
          <form onSubmit={this.handleFormSubmit}>
          <input type="" name="" placeholder="enterprise" onChange={e => this.handleChange(e)} />                
          <br/>
          <h3>price</h3>         
          <input type="date" name="" placeholder="" onChange={e => this.handleChange(e)} />
          <input type="time" name="" placeholder="" onChange={e => this.handleChange(e)} />
          <input type="submit" value="submit"/>
        </form>

      </div>
    )
  }
}
