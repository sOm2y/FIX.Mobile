import React , { Component } from 'react';
import Expo from 'expo';
import { View } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text, Form } from 'native-base';
import { Field, reduxForm } from 'redux-form';
import ListPicker from '../business/ListPicker';
import PhoneInput from './PhoneInput';

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

export class DetailForm extends Component {
    constructor(props){
        super(props);
        this.renderInput = this.renderInput.bind(this);
    }
    
     submit = (values, props) => {
        console.log(values+' '+props);
      }

    renderInput({ input, label, type, meta: { touched, error, warning } }){
        var hasError= false;
        if(error !== undefined){
            hasError= true;
        }
        return ( 
            <Item style= {{ margin: 10 }} error= {hasError}>
            <Input {...input}/>
            {hasError ? <Text>{error}</Text> : <Text />}
        </Item> );
    }
    render(){
        const { handleSubmit, reset } = this.props;
        return (
    
            <Form>
            
                <Text>Email</Text>
                <Field name="email" component={this.renderInput} />
                <Text>Name</Text>
                <Field name="name" component={this.renderInput} />
                <Button block primary onPress= {handleSubmit((values)=>{this.submit(values,this.props)})}>
                 <Text>Submit</Text>
                </Button>

                <ListPicker />
                <PhoneInput />
          
            </Form>
            
        )
    }
}


export default reduxForm({
  form: 'test',
  validate
})(DetailForm)