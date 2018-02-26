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
