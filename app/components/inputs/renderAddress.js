import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Item, Input, Icon } from 'native-base';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export const renderAddress= ({ input:{value, onChange}, label, type, meta: { touched, error, warning, dispatch } }) => {
    var hasError= false;
    if(error !== undefined){
        hasError= true;
    }
    return ( 

      <GooglePlacesAutocomplete
        placeholder='Search'
        minLength={2} // minimum length of text to search
        autoFocus={false}
        returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
        listViewDisplayed='auto'    // true/false/undefined
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data.description);
          console.log(details);
          if(data.description&& details.geometry){
            value = { description : data.description, 
                      longitude : details.geometry.location.lng, 
                      latitude: details.geometry.location.lat 
                    };
          }else{
            value ={}
          }
          console.log(value);
          onChange(value);
          //dispatch(value);
        }}
        getDefaultValue={() => ''}
        
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyDZBKV2X0AH4v6vUoUMcIakBAk8NXehuiY',
          language: 'en', // language of the results
          types: 'address' // default: 'geocode'
        }}
        
        styles={{
          textInputContainer: {
            width: '100%'
          },
          description: {
            fontWeight: 'bold'
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          }
        }}
        
        currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
        currentLocationLabel="Current location"
        nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
        GoogleReverseGeocodingQuery={{
          // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
        }}
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'food'
        }}
  
        filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
  
        debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

      />
  );
};


function mapStateToProps (state, props) {
  return {
    input : state.input
  }
}

function mapDispatchToProps (dispatch, props) {
  return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(renderAddress)