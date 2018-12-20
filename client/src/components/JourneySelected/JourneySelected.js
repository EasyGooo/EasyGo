import React, { Component } from 'react'
import axios from 'axios'
import NotificationsService from '../../Service/NotificationsService';
export default class JourneySelected extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       journey:{},
      places:null
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

// getPlaces = ( ) =>{
//   this.state.journey.journey?(
//     this.setState({places:this.state.journey.journey.places})
//   ):(
//     console.log('kjassazs')
//   )
// }
  
    componentDidMount() {
      //  this.getPlaces()
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
  <div>
  <p>{this.state.journey.journey.company}</p>
  <p>{this.state.journey.journey.date}</p>
  </div>
):(
  <p>loading..</p>
);


console.log(this.state.journey)
if(this.state.journey.journey)
console.log(this.state.journey.journey.company)
    return (
      <div>
       {painter}
       <button onClick={this.applyForPlace}>apply</button>
      </div>
    )
  }
}
