import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import Mapa from '../../Mapas/Mapas.js'
import JourneyService from '../../../Service/JourneyService.js'
export default class Join extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      company: '',
      date: '',
      time: '',
      description: '',
      distance: null,
      duration:null,
      startPoint: null,
      endPoint: null,
      places:5
      
    }
    this.journeyService = new JourneyService();
  }


  handleFormSubmit = (e) => {
    e.preventDefault();

    const {company,places,date,time,description,distance,duration,startPoint,endPoint} = this.state;

    this.journeyService.userJourneysCreate({company,places,date,time,description,distance,duration,startPoint,endPoint})
   
  }
  
startPoint = (info) =>{
  this.setState({
    startPoint: info
},() => console.log('Updated Creation State:', this.state));
}

endPoint = (info) =>{
  this.setState({
    endPoint: info
},() => console.log('Updated Creation State:', this.state));
}
 
distance = (info) =>{
  this.setState({
    distance: info
},() => console.log('Updated Creation State:', this.state));
}

handleChange = (e) => {
  const {name, value} = e.target;
  this.setState({
    [name]: value
  },() => console.log('Updated Creation State:', this.state)
    );
}
  render() {
    
    return (
      <div>
         
         <Nav />
         <h1>Create</h1>
          <form onSubmit={this.handleFormSubmit}>
          <input type="text" name="company" placeholder="company name" onChange={e => this.handleChange(e)} /> 
          <Mapa startPoint={this.startPoint} endPoint={this.endPoint} distance={this.distance}/>               
          <br/>
          
          <h3>price</h3>         
          <input type="date" name="date" placeholder="" onChange={e => this.handleChange(e)} />
          <input type="time" name="time" onChange={e => this.handleChange(e)} />
          <input type="text" name="description" placeholder="" onChange={e => this.handleChange(e)} />
          
          <button type="submit" value="submit" className="btn"> 
          submit
          <div className='ico'><i className="fa fa-paper-plane"></i></div></button>
        </form>

      </div>
    )
  }
}
