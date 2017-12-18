import React from "react";
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderAddress } from "../../inputs/renderAddress";


export class AddressForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
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
                disabled={pristine || submitting}>
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
  form: 'WizardForm', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(AddressForm);
