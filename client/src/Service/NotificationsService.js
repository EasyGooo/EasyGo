import axios from "axios";

class NotificationsService{
constructor(props) {
  
  this.service = axios.create({
    baseURL: "http://localhost:5000/api/notifications",
    withCredentials: true
  })

}

create = (data) => {
  return this.service.post('/create', data)
  .then(response => response.data)
}
status = (data) => {
  return this.service.post('/status', data)
  .then(response => response.data)
}
sentNotifs = (data) => {
  return this.service.get('/sentNotifications', data)
  .then(response => response.data)
}

placesChange = (data) => {
  return this.service.post('/change', data)
  .then(response => response.data)
}

getNotifications = (data) => {
  return this.service.get('/show', data)
  .then(response => response.data)
}

}


export default NotificationsService;