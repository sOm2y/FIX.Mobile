import React from "react";
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderEmail } from "../../../components/inputs/renderEmail";
import { renderPhone } from "../../../components/inputs/renderPhone";

export class DetailForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="firstname"
                    type="text"
                    component={renderName}
                    label="First Name"
                />
                <Field
                    name="lastname"
                    type="text"
                    component={renderName}
                    label="Last Name"
                />
                 <Field
                    name="email"
                    type="email"
                    component={renderEmail}
                    label="Email"
                />
                <Field
                    name="phonenumber"
                    type="number"
                    component={renderPhone}
                    label="Phone number"
                />
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Next</Text>
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
})(DetailForm);
