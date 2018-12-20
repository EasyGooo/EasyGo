import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import JourneyService from '../../../Service/JourneyService.js'
import axios from 'axios'
import {Link} from "react-router-dom";
export default class Join extends Component {
 
constructor(props) {
  super(props)

  this.state = {
    userStart: null,
    userEnd: null,
    journeys: null,
    journeysFiltered:[]

  }
  this.journeyService = new JourneyService();

}
getJourneys = ()=>{
  this.journeyService.
  userJourneysAccess()
  .then(data=>this.setState({ journeys:data }))
}


  startInfo = (userStart) => {
    this.setState({ ...this.state, userStart })
  
}
endInfo = (userEnd) => {
    this.setState({ ...this.state, userEnd })
        
}


filterByDistance = ()=>{
  
  this.state.journeys.forEach((e)=>{
  
  if (((e.coorstart.lat < (this.state.userStart.lat + 0.01)) && (e.coorstart.lat > (this.state.userStart.lat - 0.01))) && ((e.coorstart.lng < (this.state.userStart.lng + 0.01))
   && (e.coorstart.lng > (this.state.userStart.lng - 0.01))) &&  ((e.coorend.lat < (this.state.userEnd.lat + 0.01) && (e.coorend.lat > (this.state.userEnd.lat - 0.01))) && ((e.coorend.lng < (this.state.userEnd.lng + 0.01))
   &&(e.coorend.lng > (this.state.userEnd.lng - 0.01))))){
     
    this.state.journeysFiltered.push(e);
    
    
  }console.log(this.state.journeysFiltered)
})}



wantToJoinAddingStop = (e) =>{
  let journeysCloseToMyStartPoint=[];

  this.state.journeys.forEach((e)=>{
  
  if ((e.coordend.lat < (this.state.userEnd.lat + 0.01) && (e.coordend.lat > (this.state.userEnd.lat - 0.01))) && ((e.coordend.lng < (this.state.userEnd.lng + 0.01))
  &&(e.coordend.lng > (this.state.userEnd.lng - 0.01))) 
  &&  ((e.coordend.lat < (this.state.coorAsked.lat + 0.01) && (e.coordend.lat > (this.state.coorAsked.lat - 0.01))) && ((e.coordend.lng < (this.state.coorAsked.lng + 0.01))
  &&(e.coordend.lng > (this.state.coorAsked.lng - 0.01))))) {
    journeysCloseToMyStartPoint.push(e)
  }
})
}
// getDistance =() =>{
//   let DirectionsService = new window.google.maps.DirectionsService();
  
//   let pointInTheWaylat=this.routes[0].overview_path[0].lat();
//   let pointInTheWaylng=this.routes[0].overview_path[0].lng();
//   if (this.coorAsked){
//   DirectionsService.route(
//     {
//       origin: new window.google.maps.LatLng(this.coorAsked.lat,this.coorAsked.lng),
//       destination: new window.google.maps.LatLng(pointInTheWaylat, pointInTheWaylng),
//       travelMode: window.google.maps.TravelMode.WALKING,
//     },(result, status) => {
//       console.log(result)
//     })
//     console.log(DirectionsService)
// }}



sortByDate = (f) =>{
  this.state.journeysFiltered.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
  console.log(this.state.journeysFiltered)
 }
sortByTime = (f) =>{
  this.state.journeysFiltered.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  console.log(this.state.journeysFiltered)
 }
sortByCompany = () =>{
  let sortedArray =this.state.journeysFiltered.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
  this.setState({journeysFiltered:sortedArray})
 }
sortByPlaces = (f) =>{
  this.state.journeysFiltered.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
  console.log(this.state.journeysFiltered)
 }
sortByDistanceWalkingToMyStartPoint = (f) =>{

  this.state.journeysFiltered.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
  console.log(this.state.journeysFiltered)
 }

 sortByDistance = (f) =>{
  this.state.journeysFiltered.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  console.log(this.state.journeysFiltered)
 }



componentDidMount() {
  this.getJourneys();
}

  render() {
    console.log(this.state.journeys)
  
const funciona = this.state.userEnd==null ?(
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
 <button onClick={this.sortByCompany}>company</button>
 <button onClick={this.sortByTime}>time</button>
 <button onClick={this.sortByTime}>time</button>
 
  {this.state.journeysFiltered.map(journey => (
  <Link key={journey._id} to={`/journeys/${journey._id}`}>
    <div>
      <div>
        <h1>{journey.company}</h1>
        <p>{journey.date}</p>
        <p>{journey.distance}</p>
        <p>{journey.duration}</p>
        <p>{journey.time}</p>
      </div>
    </div>
  </Link>
))}

      </div>
    )
  }
}