import "./_map.scss";
import React, { Component } from "react";
import JourneyService from "../../Service/JourneyService.js";
import AuthService from "../../Service/AuthService.js";
import {
  withScriptjs,
  DirectionsRenderer,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import { Redirect } from "react-router-dom";

import AutocompleteStart from "./AutocompleteStart";
import AutocompleteEnd from "./AutocompleteEnd";
import AutocompleteAsked from "./AutocompleteAsked";
import companies from "../../companies.json";
import startpoints from "../../startpoints.json";
const { compose, withProps, lifecycle } = require("recompose");

require("dotenv").config();
export default class Mapas extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coorstart: null,
      coorend: null,
      cooAsked: null,
      position: { lat: 40.416947, lng: -3.703523 },
      companies,
      startpoints,
      places: 3,
      map: false,
      places: 3,
      redirect: false,
      user:null

    };
    this.MapWithADirectionsRenderer = null
    this.map = null
    this.journeyService = new JourneyService()
    this.authService = new AuthService()
    this.fetchUser()
  }

  componentWillMount() {
    this.map = this.createMap(this.comodin, this.state.map)();

   
   
  }


  fetchUser = () => {
    this.authService
      .loggedin()
      .then(user => this.setState({ ...this.state, user }));
  };

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
    this.props.distance(this.state.distance);
  };
  updateCoorAsked = coorAsked => {
    this.setState({ ...this.state, coorAsked });
  };

  handleInfo = () => {
    let coord = this.state.coorstart;
    this.props.infoMaps(coord);
  };

  comodin = (distance, duration, price) => {
    if (this.distance !== distance || this.duration !== duration)
      this.setState({ ...this.state, distance, duration, price, map: true });
  };

  createMap = (fnc, mapGoogle) => {
    const coorstart = this.state.coorstart;
    const coorend = this.state.coorend;
    const coorAsked = this.state.coorAsked;

    const map = compose(
      withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-P5Wpth-cMCDmm_TFPev1gWaoqhYAYpQ&v=3.exp&libraries=geometry,drawing,places`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `80vh`, width: `50vw` }} />,
        mapElement: <div className="map" style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() {
          let google = window.google;
          if (coorend && coorstart) {
            let DirectionsService = new google.maps.DirectionsService();
            DirectionsService.route(
              {
                origin: new google.maps.LatLng(coorstart.lat, coorstart.lng),
                destination: new google.maps.LatLng(coorend.lat, coorend.lng),
                travelMode: google.maps.TravelMode.DRIVING
                // waypoints: [
                //   {
                //     location: new google.maps.LatLng(
                //       coorAsked.lat,
                //       coorAsked.lng
                //     )
                //   }
                // ]
              },
              (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                  this.setState(
                    {
                      directions: result,
                      distance: (result.routes[0].legs[0].distance.value / 1000)
                        //   result.routes[0].legs[1].distance.value / 1000

                        .toFixed(2)
                        .toString()
                        .replace(".", ","),
                      duration: Math.floor(
                        (result.routes[0].legs[0].duration.value / 3600) * //+
                          /* result.routes[0].legs[1].duration.value / 3600 */ 60
                      ),
                      price: (
                        parseFloat(
                          result.routes[0].legs[0].distance.value / 1000
                        ) *
                        (6 / 100) *
                        1.3 *
                        2
                      ).toFixed(2),

                      start_point: result.routes[0].legs[0].start_address,
                      start_location_lat: result.routes[0].legs[0].start_location.lat(),
                      start_location_lng: result.routes[0].legs[0].start_location.lng(),
                      end_point: result.routes[0].legs[0].end_address,
                      end_location_lat: result.routes[0].legs[0].end_location.lat(),
                      end_location_lng: result.routes[0].legs[0].end_location.lng()
                    },
                    () => {
                      // let price = parseFloat(this.state.distance) * (6 / 100) * 1.3 * 2 + " €";
                      console.log(this.price);
                      console.log(this.state);
                      var tempPointlat = result.routes[0].overview_path[0].lat();
                      var tempPointlng = result.routes[0].overview_path[0].lng();
                      fnc(
                        this.state.distance,
                        this.state.duration,
                        this.state.price
                      );
                      console.log(tempPointlat, tempPointlng);
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
          defaultZoom={10}
          defaultCenter={new window.google.maps.LatLng(40.416947, -3.703523)}
        >
          {props.directions && (
            <DirectionsRenderer directions={props.directions} />
          )}
          {/* {this.state.companies.map((company, i) => {
          return (
            <Marker
              key={i}
              position={{
                lat: +company.position.lat.$numberDouble,
                lng: +company.position.lng.$numberDouble
              }}
            />
          );
        })} */}
        </GoogleMap>
      );
    });

    return map;
  };

  handleFormSubmit = e => {
    e.preventDefault();

    const {
      company,
      places,
      date,
      time,
      price,
      description,
      distance,
      duration,
      coorstart,
      coorend
    } = this.state;
    const imgPath = this.state.user.imgPath
    const username = this.state.user.username
    this.journeyService.userJourneysCreate({
      company,
      places,
      date,
      time,
      description,
      price,
      distance,
      duration,
      coorstart,
      coorend,
      username,
      imgPath
    });
    this.setState({ redirect: true });
  };
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ ...this.state, [name]: value });
  };
 
  // componentWillUpdate() {
  //     this.map = this.createMap(this.comodin, this.state.map)();
  // }
  render() {
    console.log(this.state.user);
    if (this.state && this.state.redirect) {
      return <Redirect to="/profile" />;
    }
    return (
      <div className="createSection">
        {this.map}
        {/* {this.state.companies.map(company => { return <div> {company.name}</div> })} */}
        <div className="formulary">
          {/* <p>{this.state.distance}</p> */}

          <div className="journeyInfo-block">
            <div className='info-text'>
              <div className="journeyInfo">
                <p>{this.state.duration}</p>
              </div>
              <p>mins</p>
            </div>

            <div className='info-text'>
              <div className="journeyInfo">
                <p>{this.state.price}</p>
              </div>
              <p>eur</p>
            </div>
          </div>
          <div className="autoComplete">
            <AutocompleteStart update={this.updateCoorstart} />
            <AutocompleteEnd update={this.updateCoorend} />
          </div>
          <form className="inputs" onSubmit={this.handleFormSubmit}>
            <input
              type="text"
              name="company"
              placeholder="Company name"
              onChange={e => this.handleChange(e)}
              className="inputCompany"
            />

            <br />

            <div>
              <input
                type="date"
                name="date"
                
                onChange={e => this.handleChange(e)}
                className="inputDate"
              />
              <input
                type="time"
                name="time"
                onChange={e => this.handleChange(e)}
                className="inputTime"
              />
            </div>
            <textarea
              type="text"
              name="description"
              placeholder="Requirements to travel with you ..."
              onChange={e => this.handleChange(e)}
              className="inputDescription"
            />

            <button type="submit" value="submit" className="btn">
              submit
              <div className="ico">
                <i className="fa fa-paper-plane" />
              </div>
            </button>
          </form>
        </div>
      </div>
    );
  }
}
