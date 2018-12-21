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
import { Redirect } from "react-router-dom";
import NotificationsService from '../../../Service/NotificationsService';
import AutocompleteStart from '../../Mapas/AutocompleteStart.js'
import AutocompleteEnd from '../../Mapas/AutocompleteEnd.js'
import AutocompleteAsked from "../../Mapas/AutocompleteAsked";

import Mapswithoutformwithmiddle from '../../Mapas/Mapwithoutform';
import axios from 'axios'
import { Link } from "react-router-dom";
const { compose, withProps, lifecycle } = require("recompose");

require("dotenv").config();
export default class Askstop extends Component {
  constructor(props) {
    super(props)

    this.state = {
      journey: {},
      places: null,

    }
    this.notificationsService = new NotificationsService();
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
    this.setState({ ...this.state, coorAsked} , () => {
      this.map = this.createMap(this.comodin, this.state.map)();
  });
};
  getJourney = url => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}/journeys/${url}`)
      .then(journey =>
        this.setState({
          ...this.state,
          journey: (this.props.match.params.id) ? journey.data : journey.data[0]

        })

      )
      .catch(err => console.log(err));
  };

  componentWillMount = () => {

    this.setState({ ...this.state, coorstart: this.props.startPoint, coorend: this.props.endPoint, coorAsked: this.props.coorAsked })
  }
    createMap = (fnc, mapGoogle) => {
      const coorstart = this.state.coorstart;
      const coorend = this.state.coorend;
      const coorAsked = this.state.coorAsked;

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
            if (this.props.match.params.id) {
              this.getJourney(`journeys/${this.props.match.params.id}`);
            } else {
              console.log('loading...')
            }

            let google = window.google;
            if (coorend && coorstart) {
              let DirectionsService = new google.maps.DirectionsService();
              DirectionsService.route(
                {
                  origin: new google.maps.LatLng(coorstart.lat, coorstart.lng),
                  destination: new google.maps.LatLng(coorend.lat, coorend.lng),
                  travelMode: google.maps.TravelMode.DRIVING,
                   waypoints: [
                    {
                      location: new google.maps.LatLng(
                        coorAsked.lat,
                        coorAsked.lng
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
                            (result.routes[0].legs[0].duration.value / 3600
                            + result.routes[0].legs[1].duration.value / 3600 ) *
                            60
                          ) + " min",
                        price: (parseFloat(result.routes[0].legs[0].distance.value / 1000) * (6 / 100) * 1.3 * 2).toFixed(2) + " €",
                        start_point: result.routes[0].legs[0].start_address,
                        start_location_lat: result.routes[0].legs[0].start_location.lat(),
                        start_location_lng: result.routes[0].legs[0].start_location.lng(),
                        end_point: result.routes[0].legs[0].end_address,
                        end_location_lat: result.routes[0].legs[0].end_location.lat(),
                        end_location_lng: result.routes[0].legs[0].end_location.lng()
                      },
                      () => {

                    

                        // var tempPointlat = result.routes[0].overview_path[0].lat();
                        // var tempPointlng = result.routes[0].overview_path[0].lng();

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
        })
      )(props => {

        return (
          <GoogleMap
            defaultZoom={13}
            defaultCenter={new window.google.maps.LatLng(40.416947, -3.703523)}
          >
            {props.directions && (
              <DirectionsRenderer directions={props.directions} />
            )}

          </GoogleMap>
        )
      });
    
      return map;
    };
  
  
//   applyForPlace = () => {

//     if (this.state.journey.journey.places > 0) {
//       let receptorId = this.state.journey.journey.authorId;
//       let type = 'reqPlace';
//       let journeyId = this.state.journey.journey._id;
//       let company = this.state.journey.journey.company;

//       this.notificationsService.create({ receptorId, type, company, journeyId })
//       // this.state.notifications.push(`${passenger.name} has booked a place in your journey ${journey.id}`)
//     } else {
//       return -1
//     }

//   }
// }


// componentDidMount() {
//   if (this.props.match.params.id) {
//     this.getJourney(`journeys/${this.props.match.params.id}`);
//   } else {
//    console.log('loading...')
//   }
// }


render() {
  console.log(this.state)
  const painter =

    this.state.journey.journey ? (
      <div>

        
        <Mapswithoutformwithmiddle startPoint={this.state.journey.journey.coorstart} endPoint={this.state.journey.journey.coorend} />
      </div>
    ) : (
        <p>loading..</p>
      );


  console.log(this.state.journey)
  if (this.state.journey.journey)
    console.log(this.state.journey.journey.company)
  return (
    <div>
      {painter}

      <button onClick={this.applyForPlace}>apply</button>
    </div>
  );
}
  }
