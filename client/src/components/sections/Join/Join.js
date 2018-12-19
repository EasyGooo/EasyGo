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
  f.sort(function(a,b){return a.date-b.date});
  console.log(f)
 }
sortByTime = (f) =>{
  f.sort(function(a,b){return a.time-b.time});
  console.log(f)
 }
sortByCompany = (f) =>{
  f.sort(function(a,b){return a.company-b.company});
  console.log(f)
 }
sortByPlaces = (f) =>{
  f.sort(function(a,b){return a.places-b.places});
  console.log(f)
 }
sortByDistanceWalkingToMyStartPoint = (f) =>{
  f.sort(function(a,b){return a.distanceWalkingToMyStartPoint-b.distanceWalkingToMyStartPoint});
  console.log(f)
 }
sortByPlaces = (f) =>{
  f.sort(function(a,b){return a.places-b.places});
  console.log(f)
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