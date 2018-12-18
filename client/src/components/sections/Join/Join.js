import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import JourneyService from '../../../Service/JourneyService.js'
import axios from 'axios'
export default class Join extends Component {
 
constructor(props) {
  super(props)

  this.state = {
    coorstart: null,
    coorend: null,
    journeys: null

  }
  this.journeyService = new JourneyService();

}
getJourneys = ()=>{
  this.journeyService.
  userJourneysAccess()
  .then(data=>this.setState({ journeys:data }))
}


  startInfo = (coorstart) => {
    this.setState({ ...this.state, coorstart })
  
}
endInfo = (coorend) => {
    this.setState({ ...this.state, coorend })
    
    
}

filterByDistance = ()=>{
  let staArray=[];
  
  this.state.journeys.forEach((e)=>{
  
  if (((e.startPoint.lat < (this.state.coorstart.lat + 0.01)) && (e.startPoint.lat > (this.state.coorstart.lat - 0.01))) && ((e.startPoint.lng < (this.state.coorstart.lng + 0.01))
   && (e.startPoint.lng > (this.state.coorstart.lng - 0.01))) &&  ((e.endPoint.lat < (this.state.coorend.lat + 0.01) && (e.endPoint.lat > (this.state.coorend.lat - 0.01))) && ((e.endPoint.lng < (this.state.coorend.lng + 0.01))
   &&(e.endPoint.lng > (this.state.coorend.lng - 0.01))))){
     
    staArray.push(e);
    
    
  }console.log(staArray)
})}

//  sortByCompany = (f) =>{
//   f.sort(function(a,b){return a.company-b.company});
//  }

componentDidMount() {
  this.getJourneys();
}

  render() {
    console.log(this.state.journeys)
  
const funciona = this.state.coorend==null ?(
    <p>loading...</p>
):(
     
      console.log(this.filterByDistance())
);

    return (
      <div>
         {funciona}
         <Nav />
         <AutocompleteStart update={this.startInfo}/>
         <AutocompleteEnd update={this.endInfo}/>

      </div>
    )
  }
}
