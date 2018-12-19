import React, { Component } from 'react'
import axios from 'axios'
export default class JourneySelected extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       journey:{},
       notifications:[]
    }
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


//   applyForPlace = () =>  {
//     if (this.places > 0) {
//         this.places = (this.places) - 1
//         this.state.notifications.push(`${passenger.name} has booked a place in your journey ${journey.id}`)
//     } else {
//         return -1
//     }
// }

  
    componentWillMount() {
      if (this.props.match.params.id) {
        this.getJourney(`journeys/${this.props.match.params.id}`);
      } else {
       console.log('loading...')
      }
    }
  
  render() {
console.log(this.state.journey)
if(this.state.journey.journey)
console.log(this.state.journey.journey.company)
    return (
      <div>
        <p>{this.state.journey.company}</p>
      </div>
    )
  }
}
