import React, { Component } from 'react'
import NotificationsService from '../../../../Service/NotificationsService.js'
import Nav from '../../../Nav/Nav.js'
import UserInfo from '../UserInfo/UserInfo.js'
import ProfileNav from '../ProfileNav/ProfileNav.js'
export default class Notifications extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       notifications:[],
       button:''
       
    }
    this.notificationsService = new NotificationsService();
   
  }
  getNotifications = () =>{
    this.notificationsService.
    getNotifications()
    .then(data=>this.setState({ notifications:data }))
  }
 
  
  myCallFunction(){
    [1,2,3].forEach(e => {
      this.getNotifications()
    })
  }


   acceptPassenger = ( notifId,journeyId,author,receptor) =>  {
      const idNotification = notifId;
      const status = 'Accepted';
      const authorId = receptor;
      const receptorId = author;
      this.notificationsService.status({status,idNotification,journeyId,authorId,receptorId})
      .then(this.myCallFunction())
  }
  //  denyPassenger = () =>  {
  //         if (this.places > 0) {
  //             this.places = (this.places) + 1
  //             this.state.notifications.push(`${driver.name} has denied your request`)
  //         }
  //     }

  //  newStop = () => {
  //     this.state.notifications.push(`${passenger.name} has suggested a new stop in the journey ${journey.id}`)
  // }
  //  acceptNewRoute = () => {
  //     this.state.notifications.push(`${driver.name} has accepted your change with the next conditions:`)
  // }
  //  denyNewRoute = () => {
  //     this.state.notifications.push(`${driver.name} has denied your change`)
  // }

  
  componentDidMount(){
    this.getNotifications()  
  }
  
  render() {
    
    console.log(this.state.notifications)

    return (
      <div>
             <Nav />
              <div className='profile-info-cont'>
              <UserInfo image={this.props.getImage} name={this.props.getName}/>
              <div className='profile-content'>
        {Array.isArray(this.state.notifications) && this.state.notifications.map((notification,i)=> {
          return (

            <div>
         
              {notification.type=='reqPlace' && notification.status == 'Pending'?(
                
            <div className="Message">
                <div className="Message-icon">
                  <i className="fa fa-bell-o"></i>
                </div>
                <div className="Message-body">
                <p>{notification.company}</p>
                  <button className="Message-button" key={notification._id} onClick={(e)=>this.acceptPassenger(notification._id, notification.journeyId, notification.authorId, notification.receptorId)}>Accept</button>
                  <button className="Message-button">Deny</button>
                </div>
               
            </div>
               
              ):(
                <div></div>
              )}

              {notification.type=='resPlace'?(
              <div>
                 <button>pay</button>
               </div>
              ):(
                <div>
                
                </div>
              )}
              </div>
             
            )
        })}
          
              </div>  
              <ProfileNav/>           
       </div>     
      </div>
      
    )
  }
}





