import "./_map.scss";
import React, { Component } from 'react'
import { withScriptjs, DirectionsRenderer,withGoogleMap, GoogleMap, Marker } from "react-google-maps"

import AutocompleteStart from './AutocompleteStart';
import AutocompleteEnd from './AutocompleteEnd';
import AutocompleteAsked from './AutocompleteAsked';
import companies from '../../companies.json'
import startpoints from '../../startpoints.json'
import { MapContainer } from "./Currentposition/MapContainer";
const { compose, withProps, lifecycle } = require("recompose");
// const {
//     withScriptjs,
//     withGoogleMap,
//     GoogleMap,
//     DirectionsRenderer,
//     Marker
// } = require("react-google-maps");
require('dotenv').config();
export default class Mapas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            coorstart: null,
            coorend: null,
            cooAsked:null,
            position: { lat: 40.416947, lng: -3.703523 },
            companies,
            startpoints
        }
        this.MapWithADirectionsRenderer=null;
    }


    updateCoorstart = (coorstart) => {
        this.setState({ ...this.state, coorstart })
    }
    updateCoorend = (coorend) => {
        this.setState({ ...this.state, coorend })
    }
    updateCoorAsked = (coorAsked)=>{
        this.setState({ ...this.state, coorAsked })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();

        const { latLng } = this.state;
        this.change({ latLng })
            .then(user => this.props.getUser(user));
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({ [name]: value });
    }
  

    createMap = () => {
        const coorstart = this.state.coorstart;
        const coorend = this.state.coorend;
        const coorAsked = this.state.coorAsked;
 


        return  compose(
            withProps({
                googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyB-P5Wpth-cMCDmm_TFPev1gWaoqhYAYpQ&v=3.exp&libraries=geometry,drawing,places`,
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div  style={{ height: `400px` , width: `600px`}} />,
                mapElement: <div className="map" style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    let google = window.google;
                    if (coorend && coorAsked) {
                        let DirectionsService = new google.maps.DirectionsService();
                        DirectionsService.route({
                            origin: new google.maps.LatLng(coorstart.lat, coorstart.lng),
                            destination: new google.maps.LatLng(coorend.lat, coorend.lng),
                            travelMode: google.maps.TravelMode.DRIVING,
                            waypoints: [
                                {
                                   location: new google.maps.LatLng(coorAsked.lat,coorAsked.lng)
                                },
                        
                           ]
                        }, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result,
                                    distance: ((result.routes[0].legs[0].distance.value/1000 + result.routes[0].legs[1].distance.value/1000)).toString().replace(".",",") + " Km",
                                    duration:Math.floor(((((result.routes[0].legs[0].duration.value/3600) + (result.routes[0].legs[1].duration.value/3600))*60))) + " min" ,
                                    start_point: result.routes[0].legs[0].start_address,
                                    start_location_lat:result.routes[0].legs[0].start_location.lat(),
                                    start_location_lng:result.routes[0].legs[0].start_location.lng(),
                                    end_point: result.routes[0].legs[0].end_address,
                                    end_location_lat:result.routes[0].legs[0].end_location.lat(),
                                    end_location_lng:result.routes[0].legs[0].end_location.lng(),

                                }, () => {
                                    let precio = parseFloat(this.state.distance) * (6 / 100) * 1.3 * 2 + " €"
                                    console.log(precio)
                                    console.log(this.state)
                                    var tempPointlat=result.routes[0].overview_path[0].lat();
                                    var tempPointlng=result.routes[0].overview_path[0].lng();
                                    
                                    console.log(tempPointlat,tempPointlng)
                                    // console.log((result.routes[0].legs[0].duration.value/3600) + (result.routes[0].legs[1].duration.value/3600).toString().split(".",1))
                                   
                                })

                            } else {
                                console.error(`error fetching directions ${result}`);
                            }
                        });
                    }
                }
            })

        )(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={new window.google.maps.LatLng(40.416947, -3.703523)}
            >

                {props.directions && <DirectionsRenderer directions={props.directions} />}
                {this.state.companies.map((company, i) => {
                     return <Marker key={i} position={{ lat: +company.position.lat.$numberDouble, lng: +company.position.lng.$numberDouble }} /> })}
                
        

            </GoogleMap>
        );

    }
  

    render() {
        const map = this.createMap()()
        console.log(this.state.distance)
        
        
        return (
            <div>
                {/* {this.state.companies.map(company => { return <div> {company.name}</div> })} */}

                <AutocompleteStart update={this.updateCoorstart} />
                <AutocompleteEnd update={this.updateCoorend} />
                <AutocompleteAsked update={this.updateCoorAsked} />
                {/* <MapWithADirectionsRenderer /> */}
                {this.createMap()()}
               

                <div>
                    <p>{console.log(this.state.duration)}</p>
                    <p>{this.state.distance}</p>
                </div>
            </div>

        )
    }
}

