import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { translate } from 'react-i18next';
import { Button, Text, Form, List, ListItem, Body, Right} from "native-base";

let ConfirmationForm = props => {
  const {
    username,
    email,
    phonenumber,
    firstname,
    lastname,
    address,
    previousPage,
    handleSubmit,
    pristine,
    submitting,
  } = props;
  return (
        //TODO: should use iteration to loop them out instead duplicate structure here.
        <List>
            <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your username : {username}</Text>
                </Body>
            </ListItem>
            <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your email : {email}</Text>
                </Body>
            </ListItem>
            <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your phone number : {phonenumber}</Text>
                </Body>
            </ListItem>
            <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your full name : {firstname + ' '+ lastname}</Text>
                </Body>
            </ListItem>
            <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your phone number : {phonenumber}</Text>
                </Body>
            </ListItem>
            <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your home address : {address&&address.location}</Text>
                </Body>
            </ListItem>
            <Button block primary
            style={{ marginTop: 10 }}
            onPress={handleSubmit} 
            disabled={submitting}>
                <Text>Confirm</Text>
            </Button>
            <Button bordered block primary
            style={{ marginTop: 10 }}
            onPress={previousPage} 
            disabled={submitting}>
                <Text>Previous</Text>
            </Button>
        </List>
       
      
   

  );
};

// The order of the decoration does not matter.

// Decorate with redux-form
ConfirmationForm = reduxForm({
  form: 'WizardForm', // a unique identifier for this form
})(ConfirmationForm);

// Decorate with connect to read form values
const selector = formValueSelector('WizardForm'); // <-- same as form name
ConfirmationForm = connect(state => {
    const username = selector(state, 'username');
    const email = selector(state, 'email');
    const phonenumber = selector(state, 'phonenumber');
    const firstname = selector(state, 'firstname');
    const lastname = selector(state, 'lastname');
    const address = selector(state, 'address');
    return {
        username,
        email,
        phonenumber,
        firstname,
        lastname,
        address
    };
})(ConfirmationForm);

export default ConfirmationForm;
