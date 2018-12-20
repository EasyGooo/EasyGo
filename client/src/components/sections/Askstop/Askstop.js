import "../../Mapas/_map.scss";
import React, { Component } from 'react'
import JourneyService from '../../../Service/JourneyService.js'
import Nav from '../../Nav/Nav.js'
import {
    withScriptjs,
    DirectionsRenderer,
    withGoogleMap,
    GoogleMap,
    Marker
  } from "react-google-maps";
  import {Redirect} from "react-router-dom";

import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import AutocompleteAsked from "../../Mapas/AutocompleteAsked";
import axios from 'axios'
import {Link} from "react-router-dom";
const { compose, withProps, lifecycle } = require("recompose");

require("dotenv").config();
export default class Askstop extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          coorstart: null,
          coorend: null,
          cooAsked: null,
          position: { lat: 40.416947, lng: -3.703523 },
          journeys:null,
          
          places:3,
          map: false,
          redirect:false
        };
        this.MapWithADirectionsRenderer = null;
        this.map = null;
        this.journeyService = new JourneyService();
      }+

      getJourneys = ()=>{
        this.journeyService.
        userJourneysAccess()
        .then(data=>this.setState({ journeys:data }))
      }

      updateCoorstart = coorstart => {
        this.setState({ ...this.state, coorstart }, () => {
            this.map = this.createMap(this.comodin, this.state.map)();
        });
        this.props.startPoint(coorstart);
      };
      updateCoorend = coorend => {
        this.setState({ ...this.state, coorend }, () => {
            this.map = this.createMap(this.comodin, this.state.map)();
        });
        this.props.endPoint(coorend);
        this.props.distance(this.state.distance)
      };
      updateCoorAsked = coorAsked => {
        this.setState({ ...this.state, coorAsked });
      };
    
      handleInfo = () => {
        let coord = this.state.coorstart;
        this.props.infoMaps(coord);
      };
    
      comodin = (distance, duration,price) => {
          if(this.distance !== distance || this.duration !== duration || this.price !== price)
            this.setState({...this.state, distance, duration,price, map:true})
      }
    
    

      createMap = (fnc, mapGoogle) => {
        const coorstart = this.state.coorstart;
        const coorend = this.state.coorend;
        const coorAsked = this.state.coorAsked;
        
        console.log(coorstart, coorend, coorAsked)
        const map = compose(
          withProps({
            googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-P5Wpth-cMCDmm_TFPev1gWaoqhYAYpQ&v=3.exp&libraries=geometry,drawing,places`,
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `400px`, width: `600px` }} />,
            mapElement: <div className="map" style={{ height: `100%` }} />
          }),
          withScriptjs,
          withGoogleMap,
          lifecycle({
            componentDidMount() {
             
              let google = window.google;
              if (coorAsked){
                let DirectionsService = new google.maps.DirectionsService();
                DirectionsService.route(
                  {
                    origin: new google.maps.LatLng(40.32,-3.75),
                    destination: new google.maps.LatLng(41.32, -3,69),
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints: [
                      {
                        location: new google.maps.LatLng(
                          coorAsked.lat,coorAsked.lng
                        )
                      }
                    ]
                  },
                  (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                      
                        this.setState(
                            {
                              directions: result,
                              distance:
                                (
                                  result.routes[0].legs[0].distance.value / 1000 
                                + result.routes[0].legs[1].distance.value / 1000
                                ).toFixed(2)
                                  .toString()
                                  .replace(".", ",") + " Km",
                              duration:
                                Math.floor(
                                  (result.routes[0].legs[0].duration.value / 3600 +
                                    result.routes[0].legs[1].duration.value / 3600)*
                                    60
                                ) + " min",
                              price:(parseFloat(result.routes[0].legs[0].distance.value / 1000)* (6 / 100) * 1.3 * 2).toFixed(2) + " €" ,
                              start_point: result.routes[0].legs[0].start_address,
                              start_location_lat: result.routes[0].legs[0].start_location.lat(),
                              start_location_lng: result.routes[0].legs[0].start_location.lng(),
                              end_point: result.routes[0].legs[0].end_address,
                              end_location_lat: result.routes[0].legs[0].end_location.lat(),
                              end_location_lng: result.routes[0].legs[0].end_location.lng()
                            },
                        () => {
                          
                          // let precio = parseFloat(this.state.distance) * (6 / 100) * 1.3 * 2 + " €";
                          console.log(this.price);
                          console.log(this.state);
                          // var tempPointlat = result.routes[0].overview_path[0].lat();
                          // var tempPointlng = result.routes[0].overview_path[0].lng();
                            fnc(this.state.distance, this.state.duration)
                          // console.log(tempPointlat, tempPointlng);
                          // console.log((result.routes[0].legs[0].duration.value/3600) + (result.routes[0].legs[1].duration.value/3600).toString().split(".",1))
                        }
                      );
                    } else {
                      console.error(`error fetching directions ${result}`);
                    }
                  }
                );
              }
            }
          }
         
          )
        )(props => {
            
            return(
          <GoogleMap
            defaultZoom={13}
            defaultCenter={new window.google.maps.LatLng(40.416947, -3.703523)}
          >
            {props.directions && (
              <DirectionsRenderer directions={props.directions} />
            )}
          
          </GoogleMap>
        )});
        
        return map;
      };
    
      handleFormSubmit = (e) => {
        e.preventDefault();
    
        const {company,places,date,time,description,distance,duration,coorstart,coorend} = this.state;
    
        this.journeyService.userJourneysAskstop({company,places,date,time,description,distance,duration,coorstart,coorend})
       this.setState({redirect:true})
      }
    handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({...this.state,[name]: value});
      }
    componentWillMount(){
        this.map = this.createMap(this.comodin, this.state.map)();
      this.getJourneys()
    }
    // componentWillUpdate() {
    //     this.map = this.createMap(this.comodin, this.state.map)();
    // }
      render() {
       
        console.log(this.state.journeys);
        if(this.state && this.state.redirect) {
            return <Redirect to="/home" />
          }
        return (
          <div>
            
    
            <AutocompleteStart update={this.updateCoorstart} />
            <AutocompleteEnd update={this.updateCoorend} />
            <AutocompleteAsked update={this.updateCoorAsked} />
            {/* <MapWithADirectionsRenderer /> */}
            {this.map}
    
          </div>
        );
      }
    }