import React, { Component } from 'react'
import LocationSearchInput from './Autocomplete.js'

export default class Mapas extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        const { compose, withProps, lifecycle } = require("recompose");
        const {
            withScriptjs,
            withGoogleMap,
            GoogleMap,
            DirectionsRenderer,
        } = require("react-google-maps");

        const MapWithADirectionsRenderer = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDUu4BEjnUfPgqV1OEBKSyKsllX64AtKvo&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%` }} />,
                containerElement: <div style={{ height: `400px` }} />,
                mapElement: <div style={{ height: `100%` }} />,
            }),
            withScriptjs,
            withGoogleMap,
            lifecycle({
                componentDidMount() {
                    const google = window.google;
                    const DirectionsService = new google.maps.DirectionsService();
                    DirectionsService.route({
                        origin: new google.maps.LatLng(41.416947, -3.703523),
                        destination: new google.maps.LatLng(40.417203, -3.703600),
                        travelMode: google.maps.TravelMode.DRIVING,
                    }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                            this.setState({
                                directions: result,
                            });
                        } else {
                            console.error(`error fetching directions ${result}`);
                        }
                    });
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
                <LocationSearchInput/>
                <MapWithADirectionsRenderer />
            </div>
        )
    }
}



