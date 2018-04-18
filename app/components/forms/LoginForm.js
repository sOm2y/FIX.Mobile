import React from "react";
import { Button, Text, Form, Spinner } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validateHelper';
import { renderName } from '../../components/inputs/renderUsername';
import { renderPassword } from '../../components/inputs/renderPassword';


export class LoginForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });

    render(){
        const { handleSubmit, navigation, submitting } = this.props;
        
        return (
            <Form>
                <Field
                    style={{color:'white'}}
                    name="username"
                    type="text"
                    fontColor={{color:'white'}}
                    component={renderName}
                    label="Username"
                />
                <Field
                    name="password"
                    type="password"
                    fontColor={{color:'white'}}
                    component={renderPassword}
                    label="Password"
                />
   
                <Button block light
                style={{ marginTop: 10 }}
                onPress={handleSubmit}
                disabled={submitting}>
                    {submitting ? <Spinner color='white' />: <Text>Sign In</Text>}
                </Button>
            </Form>
        );
    }
}

export default reduxForm({
  form: 'LoginForm', //                 <------ same form name
  validate,
})(LoginForm);
