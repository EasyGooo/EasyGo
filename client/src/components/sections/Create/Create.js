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
  this.setState({...this.state,[name]: value});
}
  render() {
    
    return (
      <div>
         
         <Nav />
          <Mapa startPoint={this.startPoint} endPoint={this.endPoint} user={this.props.username} distance={this.distance}/>               
          

      </div>
    )
  }
}
