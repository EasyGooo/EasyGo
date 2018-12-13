import React, { Component } from 'react'

import AutocompleteStart from './AutocompleteStart';
import AutocompleteEnd from './AutocompleteEnd';
require ('dotenv').config();
export default class Mapas extends Component {
    constructor(props) {
        super(props)

        this.state = {
            coorstart: null,
            coorend:null
            
        }
    }
    updateCoorstart = (coorstart) => {
        this.setState({...this.state, coorstart})
    }
    updateCoorend = (coorend) => {
        this.setState({...this.state, coorend})
    }
    handleFormSubmit = (e) => {
        e.preventDefault();

        const {latLng} = this.state;
        this.change({latLng})
        .then(user => this.props.getUser(user));
      }
    
    handleChange = (e) => {
        const {name, value} = e.target;
    
        this.setState({[name]: value});
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
        } = require("react-google-maps");

        const MapWithADirectionsRenderer = compose(
            withProps({
                googleMapURL: `https://maps.googleapis.com/maps/api/js?key=AIzaSyAsgK9PPQmDSHf-goNS4JqqG-OMGSiTnpo&v=3.exp&libraries=geometry,drawing,places`,
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    let google = window.google;
                    if(coorend){
                       
                    let DirectionsService = new google.maps.DirectionsService();
                    DirectionsService.route({
                        origin: new google.maps.LatLng(coorstart.lat, coorstart.lng),
                        destination: new google.maps.LatLng(coorend.lat, coorend.lng),
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });}
                }
            })
        )(props =>
            <GoogleMap
                defaultZoom={13}
                defaultCenter={new window.google.maps.LatLng(40.416947, -3.703523)}
            >
                {props.directions && <DirectionsRenderer directions={props.directions} />}
                
            </GoogleMap>
        );
        return (
            <div>
        
                <AutocompleteStart update={this.updateCoorstart}/>
                <AutocompleteEnd update={this.updateCoorend}/>
               
                <MapWithADirectionsRenderer />
                
            </div>
        )
    }
}



