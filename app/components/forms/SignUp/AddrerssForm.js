import React from "react";
import { translate } from 'react-i18next';
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderAddress } from "../../../components/registration/renderAddress";


@translate(['home', 'common'], { wait: true })

export class AddressForm extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: screenProps.t('home:title')
    });
    
    render(){
        const { handleSubmit, navigation, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="address"
                    type="text"
                    component={renderAddress}
                    label="Your address"
                />
               
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={submitting}>
                    <Text>Submit</Text>
                </Button>
                <Button bordered block primary
                style={{ marginTop: 10 }}
                onPress={previousPage} 
                disabled={submitting}>
                    <Text>Previous</Text>
                </Button>
            </Form>
        );
    }
}

export default reduxForm({
  form: 'AddressForm', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(AddressForm);
