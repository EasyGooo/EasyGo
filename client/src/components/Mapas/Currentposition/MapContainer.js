// import React, { Component } from 'react';
// import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';

// import Currentposition from './MapContainer';

// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {}
//   };

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     });

//   onClose = props => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       });
//     }
//   };

//   render() {
//     return (
//       <Currentposition
//         centerAroundCurrentLocation
//         google={this.props.google}
//       >
//         <Marker onClick={this.onMarkerClick} name={'current location'} />
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//         </InfoWindow>
//       </Currentposition>
//     );
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: 'YAIzaSyB-P5Wpth-cMCDmm_TFPev1gWaoqhYAYpQ'
// })(MapContainer);