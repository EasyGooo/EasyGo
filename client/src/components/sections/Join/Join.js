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
  
  this.setState({journeysFiltered:sortedArray})
 }
sortByPlaces = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.places> b.places) ? 1 : ((b.places > a.places) ? -1 : 0))
  this.setState({journeysFiltered:sortedArray})
 }
sortByDistance = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.distance > b.distance) ? 1 : ((b.distance > a.distance) ? -1 : 0))
  this.setState({journeysFiltered:sortedArray})
 }
 sortByDuration = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.duration > b.duration) ? 1 : ((b.duration > a.duration) ? -1 : 0))
  this.setState({journeysFiltered:sortedArray})
 } 
 sortByPrice = () =>{
  let sortedArray = this.state.journeysFiltered.sort((a,b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0))
  this.setState({journeysFiltered:sortedArray})
 } 

componentDidMount() {
  this.getJourneys();
}


  render() {
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
    <h1 style={{ color: 'white' }}>Where do you want to go ?</h1>
    <div className='tools'>
         <div  className='userJourney'>
      
            <AutocompleteStart update={this.startInfo}/>
            <AutocompleteEnd update={this.endInfo}/>     
       
         </div>

 
           <div className='filters'>
           <div className= 'toggle'>
             <p>Sort By:</p>
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
      </div>
<div className='journeys-block'>
  {this.state.journeysFiltered.map(journey => (
  <Link className='link-style' key={journey._id} to={`/journeys/${journey._id}`}>
    <div className="card">
      <div className="card_Banner">
        <img className='card_Avatar'src={journey.imgPath} alt=""/>
        <h3> {journey.username}</h3>
      </div>
      <p>Travel to: {journey.company}</p>
      <p><b>Start time: </b>{journey.date}    {journey.time}</p>
      <p><b>Price: </b>{journey.price}</p>
    </div>
  </Link>
))}
</div>

</div>
</div>
     
    )
  }
}


