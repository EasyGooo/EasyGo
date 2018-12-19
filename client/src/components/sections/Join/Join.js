import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import AutocompleteAsked from '../../Mapas/AutocompleteAsked.js'
import JourneyService from '../../../Service/JourneyService.js'
import axios from 'axios'
import {
  withScriptjs,
  DirectionsRenderer,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
const { compose, withProps, lifecycle } = require("recompose");
export default class Join extends Component {
 
constructor(props) {
  super(props)

  this.state = {
    coorstart: null,
    coorend: null,
    journeys: null,
    coorAsked:null

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
askedInfo = (coorAsked)=> {
  this.setState({ ...this.state, coorAsked })
}
filterByDistance = (e)=>{
  let staArray=[];
  
  this.state.journeys.forEach((e)=>{
  
  if (((e.startPoint.lat < (this.state.coorstart.lat + 0.01)) && (e.startPoint.lat > (this.state.coorstart.lat - 0.01))) && ((e.startPoint.lng < (this.state.coorstart.lng + 0.01))
   && (e.startPoint.lng > (this.state.coorstart.lng - 0.01))) &&  ((e.endPoint.lat < (this.state.coorend.lat + 0.01) && (e.endPoint.lat > (this.state.coorend.lat - 0.01))) && ((e.endPoint.lng < (this.state.coorend.lng + 0.01))
   &&(e.endPoint.lng > (this.state.coorend.lng - 0.01))))){
     
    staArray.push(e);
    
    
  }console.log(staArray)
})}


wantToJoinAddingStop = (e) =>{
  let journeysCloseToMyStartPoint=[];

  this.state.journeys.forEach((e)=>{
  
  if ((e.endPoint.lat < (this.state.coorend.lat + 0.01) && (e.endPoint.lat > (this.state.coorend.lat - 0.01))) && ((e.endPoint.lng < (this.state.coorend.lng + 0.01))
  &&(e.endPoint.lng > (this.state.coorend.lng - 0.01))) 
  &&  ((e.endPoint.lat < (this.state.coorAsked.lat + 0.01) && (e.endPoint.lat > (this.state.coorAsked.lat - 0.01))) && ((e.endPoint.lng < (this.state.coorAsked.lng + 0.01))
  &&(e.endPoint.lng > (this.state.coorAsked.lng - 0.01))))) {
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
    // this.getDistance();
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
         {/* <AutocompleteAsked update={this.askedInfo}/> */}
      </div>
    )
  }
}