import React , { Component } from 'react';
import Expo from 'expo';
import { View } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form, Picker, ListItem } from 'native-base';
import { Field, reduxForm } from 'redux-form';

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

export class ListPicker extends Component {
    
    submit = (values, props) => {
        console.log(values+' '+props);
    }

    renderPicker = ({ input, label, children, ...custom }) => {
        return (  
            <Picker placeholder="Select One" {...input} selectedValue={input.value} onValueChange={(value, index) => input.onChange(value)} {...custom}> 
            { children }
            </Picker>
      
        );
    }

    render(){
        const { handleSubmit } = this.props;
        /** Inside Form Component render() **/
      

        return (
            <Field name="vehicleType" mode="dropdown" style={{left: 10}} component={this.renderPicker} >
                <Item label="Car" value="Car" />
                <Item label="Bus" value="Bus" />
                <Item label="Bajaji" value="Bajaji" />
                <Item label="Motorbike" value="Motobike" />
                <Item label="Camel" value="Camel" />
            </Field>
        );
    }
}


export default reduxForm({
  form: 'listpicker',
  validate
})(ListPicker)