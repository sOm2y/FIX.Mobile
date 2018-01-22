import React from "react";
import { Button, Text, Form } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPassword } from "../../../components/inputs/renderPassword";
import { renderDatePicker } from "../../../components/inputs/renderDatePicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import {getAddress} from '../../../services/addressService';


export class JobDetailForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });

    getAddresses = () =>{
        getAddress();
    }
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="title"
                    type="text"
                    component={renderName}
                    label="Title"
                />

                <Field
                    name="description"
                    type="text"
                    component={renderTextarea}
                    label="Description"
                />

                <Field
                    name="date"
                    type="text"
                    component={renderDatePicker}
                    label="Date"
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
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(JobDetailForm);
