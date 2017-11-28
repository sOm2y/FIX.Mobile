import React from "react";
import { translate } from 'react-i18next';
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPassword } from "../../../components/inputs/renderPassword";


@translate(['home', 'common'], { wait: true })

export class CredentialForm extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: screenProps.t('home:title')
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="username"
                    type="text"
                    component={renderName}
                    label="Username"
                />

                <Field
                    name="password"
                    type="password"
                    component={renderPassword}
                    label="Password"
                />
                <Field
                    name="confirmpassword"
                    type="password"
                    component={renderPassword}
                    label="Re password"
                />
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Next</Text>
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
})(CredentialForm);