import "./_map.scss";
import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import AutocompleteStart from './AutocompleteStart';
import AutocompleteEnd from './AutocompleteEnd';
import companies from '../../companies.json'
import startpoints from '../../startpoints.json'
require('dotenv').config();
export default class Mapas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            start: null,
            end: null,
            position: { lat: 40.416947, lng: -3.703523 },
            companies,
            startpoints,

        }
    }


    updateCoorstart = (coorstart) => {
        this.setState({ ...this.state, coorstart })
        this.props.startPoint(coorstart)
    }
    updateCoorend = (coorend) => {
        this.setState({ ...this.state, coorend })
        this.props.endPoint(coorend)
        this.props.distance(this.state.distance)
    }

    handleInfo = () => {
        let coord = this.state.coorstart;
        this.props.infoMaps(coord)
    }
    
    render() {
    
        const coorstart = this.state.coorstart;
        const coorend = this.state.coorend;
        const { compose, withProps, lifecycle } = require("recompose");
        const {
            withScriptjs,
            withGoogleMap,
            GoogleMap,
            DirectionsRenderer,
            Marker
        } = require("react-google-maps");


        const MapWithADirectionsRenderer = compose(
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
                    if (coorend) {
                        let DirectionsService = new google.maps.DirectionsService();
                        DirectionsService.route({
                            origin: new google.maps.LatLng(coorstart.lat, coorstart.lng),
                            destination: new google.maps.LatLng(coorend.lat, coorend.lng),
                            travelMode: google.maps.TravelMode.DRIVING,
                        }, (result, status) => {
                            if (status === google.maps.DirectionsStatus.OK) {
                                this.setState({
                                    directions: result,
                                    distance: result.routes[0].legs[0].distance.text,
                                    duration: result.routes[0].legs[0].duration.text,
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

                {props.directions && <DirectionsRenderer directions={props.directions} duration={props.duration} distance={props.distance} />}
                {this.state.companies.map((company, i) => { return <Marker key={i} position={{ lat: +company.position.lat.$numberDouble, lng: +company.position.lng.$numberDouble }} /> })}

        {/* {this.state.startpoints.map((startpoint, i) => { 
            if (this.closeToStartPoint(startpoint)) return <Marker key={i} position={{ lat: +startpoint.position.lat.$numberDouble, lng: +startpoint.position.lng.$numberDouble }} /> })} */}

            </GoogleMap>
        );

        return (
            <div>
                <div>
                    
                   

                    
                    <AutocompleteStart update={this.updateCoorstart} />
                    <AutocompleteEnd update={this.updateCoorend} />

                    <MapWithADirectionsRenderer />

                    <div>
                       
                        <p>{this.state.distance}</p>
                    </div>
                </div>
            </div>

        )
    }
}

