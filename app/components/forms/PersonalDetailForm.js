import React from "react";
import { translate } from 'react-i18next';
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

import validateHelper from '../../helpers/validateHelper';
import submitPersonalDetailForm from '../../actions/index';
import authService from '../../services/authService';
import { renderName } from '../../components/registration/renderUsername';
import { renderPassword } from '../../components/registration/renderPassword';
import { renderEmail } from "../../components/registration/renderEmail";
import { renderPhone } from "../../components/registration/renderPhone";


@translate(['home', 'common'], { wait: true })

export class PersonalDetailForm extends React.Component{
    static navigationOptions = ({ navigation, screenProps }) => ({
        title: screenProps.t('home:title')
    });
    
    render(){
        const { handleSubmit, navigation, submitting } = this.props;
        
        return (
            <Form>
                <Field
                    name="username"
                    type="text"
                    component={renderName}
                    label="Username"
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
                submitting={submitting}>
                    <Text>Submit</Text>
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
