
import React from "react";
import { Button, Text, Form, Item, Icon } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validateHelper';

import JobMap from '../../components/inputs/renderJobMap'



export class MapForm extends React.Component{
    constructor() {
        super();
      }
    
    static navigationOptions = ({ navigation }) => ({
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="jobImages"
                    type="text"
                    component={JobMap}
                    label="Upload Job Images"
                />

                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Post Job</Text>
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
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(MapForm);
