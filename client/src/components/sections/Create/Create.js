import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import Mapa from '../../Mapas/Mapas.js'
export default class Join extends Component {
  render() {
    return (
      <div>
         
         <Nav />
         <h1>Create</h1>
          <form onSubmit={this.handleFormSubmit}>
          <input type="" name="" placeholder="enterprise" onChange={e => this.handleChange(e)} /> 
          <Mapa/>               
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
