import React, { Component } from 'react'
import Nav from '../../../Nav/Nav.js'
import UserInfo from '../UserInfo/UserInfo.js'
import ProfileNav from '../ProfileNav/ProfileNav.js'
import AuthService from '../../../../Service/AuthService.js'
import JourneyService from '../../../../Service/JourneyService.js'

export default class Trips extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       journeys:[],
       authorId:'',
       journeysFiltered:[]
    }
    this.authService = new AuthService();
    this.journeyService = new JourneyService();
  }
  getUser = () => {
    this.authService
      .loggedin()
      .then(user => 
        this.setState({ ...this.state, imgPath:user.imgPath , username:user.username , authorId: user.authorId}))
     
  };
  getJourneys=()=>{
    this.journeyService
    .myjourneys()
    .then(journeys=>
      
     this.setState({journeys:journeys}))
     
  }

  componentDidMount(){
    this.getUser()
    this.getJourneys()
  }

  render() {
    console.log(this.state.journeys)
    return (
      <div>
        <Nav />
        <div className='profile-info-cont'>
          <UserInfo image={this.props.getImage} name={this.props.getName}/>
          <div className='profile-content'>
          <h1 className='trips-h1'>Active trips</h1>
          <div className='scroll-div'>
            {Array.isArray(this.state.journeys.journeys) && this.state.journeys.journeys.map((journey)=> {
            return (
              <div className='journey-active-card'>
              <img className='location' src="../../../../../images/placeholder-filled-point.svg" alt=""/>
              <h2>{ journey.company }</h2>

              <div className='start-time'>  
                <div className='start-time-block'>
                  <p>Date</p>
                  <p>{journey.date}</p>
                </div>
                <div className='start-time-block'>
                  <p>Hour</p>
                  <p>{journey.time}</p>
                </div>  
              </div>

              </div>  
              )
            })}
          </div>


          </div>
          <ProfileNav/> 
        </div>
      </div>
    )
  }
}
