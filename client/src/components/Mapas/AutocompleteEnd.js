import React, { Component } from 'react'

import PlacesAutocomplete from 'react-places-autocomplete'
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';


class AutocompleteEnd extends React.Component {
    constructor(props) {
      super(props);
      this.state = { address: '' };
    }

a

    handleChange = address => {
      this.setState({ address },() => {
        console.log(this.state);
      });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {this.props.update(latLng);console.log('Success', latLng)})
        .catch(error => console.error('Error', error));

    };

  
    render() {
      
        return (
          <PlacesAutocomplete
            value={this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            className='auto-info'
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder: 'End Point',
                    className: 'location-search-inputEnd',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {loading && <div>Loading...</div>}
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className:'auto-input',
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                        
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
          </PlacesAutocomplete>
        );
      }
    }
export default AutocompleteEnd;