import React from "react";
import { Button, Text, Form, Spinner } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validateHelper';
import { renderPassword } from '../../components/inputs/renderPassword';


export class ChangePasswordForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });

    render(){
        const { handleSubmit, navigation, submitting } = this.props;
        
        return (
            <Form>
                <Field
                    name="oldPassword"
                    type="text"
                    component={renderPassword}
                    label="Old Password"
                />
                <Field
                    name="newPassword"
                    type="password"
                    component={renderPassword}
                    label="New Password"
                />
                <Field
                    name="confirmPassword"
                    type="password"
                    component={renderPassword}
                    label="Confirm Password"
                />
   
                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit}
                disabled={submitting}>
                    {submitting ? <Spinner color='white' />: <Text>Change Password</Text>}
                </Button>
            </Form>
        );
    }
}

export default reduxForm({
  form: 'ChangePasswordForm', //                 <------ same form name
  validate,
})(ChangePasswordForm);
