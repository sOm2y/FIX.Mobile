import React from "react";
import { translate } from 'react-i18next';
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';

import validate from '../../helpers/validateHelper';
import { renderName } from '../../components/registration/renderUsername';
import { renderPassword } from '../../components/registration/renderPassword';



@translate(['home', 'common'], { wait: true })

export class LoginForm extends React.Component{
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
                    name="password"
                    type="password"
                    component={renderPassword}
                    label="Password"
                />
   
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                submitting={submitting}>
                    <Text>Sign In</Text>
                </Button>
            </Form>
        );
    }
}

export default reduxForm({
  form: 'LoginForm', //                 <------ same form name
  destroyOnUnmount: true, //        <------ preserve form data
  forceUnregisterOnUnmount: false, // <------ unregister fields on unmount
  validate,
})(LoginForm);
