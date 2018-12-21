import React, { Component } from 'react'
import Nav from '../../Nav/Nav.js'
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import JourneyService from '../../../Service/JourneyService.js'
import Toggable from '../../Toggable/Toggable.js'
import axios from 'axios'
import {Link} from "react-router-dom";
export default class Join extends Component {
 
constructor(props) {
  super(props)

  this.state = {
    userStart: null,
    userEnd: null,
    directions:null,
    journeys: null,
    journeysFiltered:[],
    enabled: false 
  }
  this.journeyService = new JourneyService();

}
getJourneys = ()=>{
  this.journeyService.
  userJourneysAccess()
  .then(data=>this.setState({ journeys:data }))
}

toggleNotifications = ({ enabled }) => {
  
  this.setState({
    enabled
    
  });
};

startInfo = (userStart) => {
    this.setState({ ...this.state, userStart })
  
}
endInfo = (userEnd) => {
    this.setState({ ...this.state, userEnd })
        
}


filterByDistance = ()=>{
  if(this.state.journeysFiltered.length === 0){
  this.state.journeys.forEach((e)=>{
  
  if (((e.coorstart.lat < (this.state.userStart.lat + 0.01)) && (e.coorstart.lat > (this.state.userStart.lat - 0.01))) && ((e.coorstart.lng < (this.state.userStart.lng + 0.01))
   && (e.coorstart.lng > (this.state.userStart.lng - 0.01))) &&  ((e.coorend.lat < (this.state.userEnd.lat + 0.01) && (e.coorend.lat > (this.state.userEnd.lat - 0.01))) && ((e.coorend.lng < (this.state.userEnd.lng + 0.01))
   &&(e.coorend.lng > (this.state.userEnd.lng - 0.01))))){
     
    this.state.journeysFiltered.push(e);
   
    
  }console.log(this.state.journeysFiltered)
  })}
}




// wantToJoinAddingStop = () =>{
//   let pointInTheWay=this.routes[0].overview_path;
//   console.log(pointInTheWay)
  
//   this.state.journeys.forEach((e)=>{
//     pointInTheWay.forEach(point => {
//       // point.lat(), pont.lng();
//       console.log("entra")
//       console.log(point.lat())
//       if ((e.coordend.lat < (this.state.userEnd.lat + 0.01) && (e.coordend.lat > (this.state.userEnd.lat - 0.01))) && ((e.coordend.lng < (this.state.userEnd.lng + 0.01))
//       &&(e.coordend.lng > (this.state.userEnd.lng - 0.01)))
//       &&  ((point.lat() < (this.state.coorAsked.lat + 0.01) && (point.lat() > (this.state.coorAsked.lat - 0.01))) && ((point.lng() < (this.state.coorAsked.lng + 0.01))
//       &&(point.lng() > (this.state.coorAsked.lng - 0.01))))) {
//         this.state.journeysCloseToMyStartPoint.push(e)
//       }console.log(this.state.journeysCloseToMyStartPoint)
//     })
//   })
// }

// getDistance =() =>{
//   let DirectionsService = new window.google.maps.DirectionsService();
//   this.state.journeys.forEach((e)=>{
//   // let pointInTheWaylat=this.routes[0].overview_path[0].lat();
//   // let pointInTheWaylng=this.routes[0].overview_path[0].lng();
//   if (this.coorAsked){
//   DirectionsService.route(
//     {
//       origin: new window.google.maps.LatLng(this.coorAsked.lat,this.coorAsked.lng),
//       destination: new window.google.maps.LatLng(e.this.routes[0].overview_path[0].lat(),e.this.routes[0].overview_path[0].lng()),
//       travelMode: window.google.maps.TravelMode.WALKING,
//     },(result, status) => {
//       console.log(result)
//     })
//   }
//     console.log(DirectionsService)
// })}



sortByDate = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  
  this.setState({journeysFiltered:sortedArray})
 }
sortByTime = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  this.setState({journeysFiltered:sortedArray})
 }
sortByCompany = () =>{
  
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  
  this.setState({journeysFiltered:sortedArray})
 }
sortByPlaces = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.places> b.places) ? 1 : ((b.places > a.places) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  this.setState({journeysFiltered:sortedArray})
 }
// sortByDistanceWalkingToMyStartPoint = () =>{
  
//   let sortedArray= this.state.journeysFiltered.sort((a,b) => (a.company > b.company) ? 1 : ((b.company > a.company) ? -1 : 0))
//   console.log(this.state.journeysFiltered)
//   this.setState({journeysFiltered:sortedArray})
//  }

sortByDistance = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  this.setState({journeysFiltered:sortedArray})
 }
 sortByDuration = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  this.setState({journeysFiltered:sortedArray})
 } 
 sortByPrice = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
  console.log(this.state.journeysFiltered)
  this.setState({journeysFiltered:sortedArray})
 } 

componentDidMount() {
  this.getJourneys();
}


  render() {
    console.log(this.state.journeysFiltered)

    const funciona = this.state.userEnd==null ?(
      <p></p>
  ):(
       
        console.log(this.filterByDistance())
  );


const { enabled } = this.state;


    return (
      
      <div className='cont'>
       
       {funciona}
         <Nav />
          <div className='join-block'>
        

        <div className='menu-join'>
          <img className='join-logo' src="../../../../images/EasyGo-logo.svg" alt=""/>

         <div  className='userJourney'>
       
            <AutocompleteStart update={this.startInfo}/>
            <AutocompleteEnd update={this.endInfo}/>     
       
         </div>

 
           <div className='filters'>
           <div className= 'toggle'>
             <p>Filters:</p>
            <Toggable
              theme="default" 
              enabled={enabled}
              onStateChanged={this.toggleNotifications}
            />
            </div>

          {enabled && (
            <div className='filters-btn'>
              <button className='filters-button' onClick={this.sortByCompany}>company</button>
              <button className='filters-button' onClick={this.sortByDate}>Date</button>
              <button className='filters-button' onClick={this.sortByTime}>time</button>
              <button className='filters-button' onClick={this.sortByDistance}>distance</button>
              <button className='filters-button' onClick={this.sortByPrice}>price</button>
              <button className='filters-button' onClick={this.sortByDuration}>duration</button>
            </div>
          )}
        </div>  
      </div>

<div clssName='journeys-map'>
  {this.state.journeysFiltered.map(journey => (
  <Link className='link-style' key={journey._id} to={`/journeys/${journey._id}`}>
    <div>
      <div className = 'journey-target'>
    <div className='user-journey'>
        <img className='user-join-img' src={journey.imgPath} alt=""/>
        <p>{journey.username}</p>
    </div>
      <div className='join-inf'>      
        <h2 className='join-h2'>Travel to: {journey.company}</h2>
        <div className='text'>
        <div clssName='time'>
        <p><b>Start time: </b>{journey.date}    {journey.time}</p>
        
        </div>
          
        <p><b>Price: </b>{journey.price}</p>
        </div>
      </div>

      </div>
    </div>
  </Link>
))}
</div>

</div>
</div>
     
    )
  }
}