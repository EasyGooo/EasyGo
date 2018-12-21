import axios from 'axios'

class JourneyService{
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_API_URL}/journeys`,
      withCredentials: true
    })
  }
  
  
  companies = () => {
    return this.service.get('/companies')
    .then(response => response.data)
  }
  userJourneysAccess = () => {
    return this.service.get('/journeys')
    .then(response => response.data)
  }
  userJourneysCreate = (data) => {
    return this.service.post('/create',data)
    .then(response => response.data)
  }
  // userJourneysAskstop= (data) => {
  //   return this.service.get('/journeys/:id',data)
  //   .then(response => response.data)
  // }
  
  userCars = ()=> {
    return this.service.post('/journeys/car')
    .then(response => response.data)
  }

}
export default JourneyService;