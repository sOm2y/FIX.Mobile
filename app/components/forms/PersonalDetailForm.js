import React from "react";
import { translate } from 'react-i18next';
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';

import {renderName} from '../../components/registration/renderUsername';
import {renderPassword} from '../../components/registration/renderPassword';
import validateHelper from '../../helpers/validateHelper';
import submitPersonalDetailForm from '../../actions/index';
import isSignedIn from '../../services/authService';


@translate(['home', 'common'], { wait: true })

export class PersonalDetailForm extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: screenProps.t('home:title')
    });

    onSubmit = (values, dispatch) => {
        console.log(values);
        isSignedIn()
        .then(result => {
            dispatch(submitPersonalDetailForm(result));
        }).catch( error => {
            console.log(error);
        });
    }

    
    render(){
        const { handleSubmit, navigation, submitting } = this.props;
        
        return (
            <Form>
                <Field
                    name="username"
                    type="text"
                    component={renderName}
                    label="First Name"
                />
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
                    name="password"
                    type="text"
                    component={renderPassword}
                    label="password"
                />
                <Field
                    name="repassword"
                    type="text"
                    component={renderPassword}
                    label="Re password"
                />
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit(this.onSubmit)} 
                submitting={submitting}>
                    <Text>Goto PersonalCredential</Text>
                </Button>
            </Form>
        );
    }
}

export default reduxForm({
  form: 'PersonalDetailForm', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validateHelper,
})(PersonalDetailForm);
