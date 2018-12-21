import React, { Component } from 'react'
import axios from 'axios'
import NotificationsService from '../../Service/NotificationsService';
import Mapswithoutform from '../Mapas/Mapwithoutform';
import {Link} from "react-router-dom";
export default class JourneySelected extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      journey:{},
      places:null,
     
    }
    this.notificationsService = new NotificationsService();
  }
  getJourney = url => {
    return axios
      .get(`http://localhost:5000/api/journeys/${url}`)
      .then(journey =>
        this.setState({
          ...this.state,
          journey: (this.props.match.params.id) ? journey.data : journey.data[0]
          
        })
        
      )
      .catch(err => console.log(err));
  };


  applyForPlace = () =>  {
    
    if (this.state.journey.journey.places > 0) {
        let receptorId = this.state.journey.journey.authorId;
        let type = 'reqPlace';
        let journeyId = this.state.journey.journey._id;
        let company = this.state.journey.journey.company;

        this.notificationsService.create({receptorId,type,company,journeyId})
        // this.state.notifications.push(`${passenger.name} has booked a place in your journey ${journey.id}`)
    } else {
        return -1
    }
  
}
// getcoorstart =()=>{
//   if (this.state.journey.journey){
//     return this.state.journey.journey.coorstart
//   }
// console.log(this.getcoorstart())
  
// }

// getcoorend =()=>{
//   if (this.state.journey.journey){
//     return this.state.journey.journey.coorend
//   }
  
// }
// getPlaces = ( ) =>{
//   this.state.journey.journey?(
//     this.setState({places:this.state.journey.journey.places})
//   ):(
//     console.log('kjassazs')
//   )
// }
  
    componentDidMount() {
      if (this.props.match.params.id) {
        this.getJourney(`journeys/${this.props.match.params.id}`);
      } else {
       console.log('loading...')
      }
    }

  
  render() {
    console.log(this.state)


const painter = 

this.state.journey.journey?(
  <div className='selected-block'>
  <div className='jour-blck'>
  <div className='info-journey'>
  <h1 className='comp-selected'>{this.state.journey.journey.company}</h1>
  <p className='color-sel'>Date: {this.state.journey.journey.date}</p>
  <p className='time color-sel'>Time: {this.state.journey.journey.time}</p>
 
  
  <div className='apply-journey'>
  <Link  to='/notifications' onClick={this.applyForPlace}>apply</Link>
  </div>
  </div>
  <div className='map-selected'>
  <Mapswithoutform startPoint ={this.state.journey.journey.coorstart} endPoint ={this.state.journey.journey.coorend} />

  <div className='map-inf'>
  <div className='info-text'>
  <div className="journeyInfo">
  <p className=''>{this.state.journey.journey.duration}</p>
  </div>
  <p>min</p>
  </div>

  <div className='info-text'>
  <div className="journeyInfo">
  <p className=''>{this.state.journey.journey.price}</p>
  </div>
  <p>eur</p>
  </div>
  </div>
  </div>

  </div>
  </div>
):(
  <p>loading..</p>
);



if(this.state.journey.journey)
console.log(this.state.journey.journey.company)
    return (
      <div>
       {painter}
  
      
  
      </div>
    )
  }
}