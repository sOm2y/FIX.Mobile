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
    wizardLabel
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
            {/* <ListItem style={{  backgroundColor:'transparent', marginLeft: 0}}>
                <Body>
                    <Text>Your home address : {address&&address.location}</Text>
                </Body>
            </ListItem> */}
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
    // form: 'WizardForm', //                 <------ same form name
    destroyOnUnmount: false, //        <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(ConfirmationForm);

// Decorate with connect to read form values
const selector = (wizardLabel, ...other) => (formValueSelector(wizardLabel))(...other);

ConfirmationForm = connect((state, initialProps) => {
    const username = selector(initialProps.wizardLabel, state, 'username');
    const email = selector(initialProps.wizardLabel, state, 'email');
    const phonenumber = selector(initialProps.wizardLabel, state, 'phonenumber');
    const firstname = selector(initialProps.wizardLabel, state, 'firstname');
    const lastname = selector(initialProps.wizardLabel, state, 'lastname');
    const address = selector(initialProps.wizardLabel, state, 'address');
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
