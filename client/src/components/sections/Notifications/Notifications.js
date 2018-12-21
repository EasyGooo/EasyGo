import React, { Component } from 'react'
import NotificationsService from '../../../Service/NotificationsService.js'
import Nav from '../../../components/Nav/Nav.js'

export default class Notifications extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       notifications:[],
       newNotifications:[]
       
    }
    this.notificationsService = new NotificationsService();
  }
  getNotifications = () =>{
    this.notificationsService.
    getNotifications()
    .then(data=>this.setState({ notifications:data }))
  }
  paintNotifications = () =>{
    let array = []
    this.state.notifications?(
      
      this.state.notifications.forEach(e => {
        array.push(e)
        this.setState({newNotifications: array})
      })
       
    ):(
      console.log('not found')
    )
  }
  
   acceptPassenger = ( notifId,journeyId,author,receptor) =>  {
      const idNotification = notifId;
      const status = 'Accepted';
      const authorId = receptor;
      const receptorId = author;


      this.notificationsService.status({status,idNotification,journeyId,authorId,receptorId})
      .then(console.log)
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
   this.paintNotifications()
  }

  render() {

// const paint =
    // this.state.notifications.length !== 0 ? 
    // <p>{this.state.notifications.company}</p>
    // :<p>loading..</p>



    return (
      <div>
        {Array.isArray(this.state.notifications) && this.state.notifications.map((notification,i)=> {
          return (
            <div className='notifs-block'>
              <Nav />

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
                <button className="Message-close js-messageClose"><i class="fa fa-times"></i></button>
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
    )
  }
}





