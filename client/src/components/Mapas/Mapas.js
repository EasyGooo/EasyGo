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
            coorstart: null,
            coorend: null,
            position: { lat: 40.416947, lng: -3.703523 },
            companies,
            startpoints
        }
    }


    updateCoorstart = (coorstart) => {
        this.setState({ ...this.state, coorstart })
    }
    updateCoorend = (coorend) => {
        this.setState({ ...this.state, coorend })
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
    closeToStartPoint = (startpoint) => {
        this.state.companies.map((startpoint, i) => {
            const a = new this.props.google.maps.LatLng(startpoint.position.lat.$numberDouble, startpoint.position.lng.$numberDouble);
            console.log(a)
            const b = new this.props.google.maps.LatLng(this.state.coordstart.lat, this.state.coordstart.lng);
            console.log(this.props.google.maps.geometry.spherical.computeDistanceBetween(a, b));
            if (this.props.google.maps.geometry.spherical.computeDistanceBetween(a, b) <= 1000) {
                return true
            } else {
                return false
            }
        })}
    render() {
        console.log(this.state.companies)
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
                                    end_address: result.routes[0].legs[0].end_address,

                                }, () => {
                                    let precio = parseFloat(this.state.distance) * (6 / 100) * 1.3 * 2 + " €"
                                    console.log(precio)
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

        {this.state.startpoints.map((startpoint, i) => { 
            if (this.closeToStartPoint(startpoint)) return <Marker key={i} position={{ lat: +startpoint.position.lat.$numberDouble, lng: +startpoint.position.lng.$numberDouble }} /> })}

            </GoogleMap>
        );

        return (
            <div>
                {this.state.companies.map(company => { return <div> {company.name}</div> })}


                <AutocompleteStart update={this.updateCoorstart} />
                <AutocompleteEnd update={this.updateCoorend} />

                <MapWithADirectionsRenderer />

                <div>
                    <p>{console.log(this.state.duration)}</p>
                    <p>{this.state.distance}</p>
                </div>
            </div>

        )
    }
}

