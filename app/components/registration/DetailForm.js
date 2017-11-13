import React , { Component } from 'react';
import Expo from 'expo';
import { View, Image } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import ListPicker from '../business/ListPicker';
import PhoneInput from './PhoneInput';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const validate = values => {
    const error= {};
    error.email= '';
    error.name= '';
    var ema = values.email;
    var nm = values.name;
    if(values.email === undefined){
        ema = '';
    }
    if(values.name === undefined){
        nm = '';
    }
    if(ema.length < 8 && ema !== ''){
        error.email= 'too short';
    }
    if(!ema.includes('@') && ema !== ''){
        error.email= '@ not included';
    }

    if(nm.length > 8){
        error.name= 'max 8 characters';
    }
    return error;
};

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export class DetailForm extends Component {

    
     submit = (values, props) => {
        console.log(values+' '+props);
      }

    render(){
        const { handleSubmit, reset } = this.props;
        return (
    
            <Form>
                  <GooglePlacesAutocomplete
                  placeholder='Search'
                  minLength={2} // minimum length of text to search
                  autoFocus={false}
                  returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                  listViewDisplayed='auto'    // true/false/undefined
                  fetchDetails={true}
                  renderDescription={row => row.description} // custom description render
                  onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                    console.log(data, details);
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
                  predefinedPlaces={[homePlace, workPlace]}
            
                  debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
       
                />
                <ListPicker />

                <PhoneInput />
          
            </Form>
            
        )
    }
}


export default reduxForm({
  form: 'Personal Detail',
  validate
})(DetailForm)