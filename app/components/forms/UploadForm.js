
import React from "react";
import { Button, Text, Form, Item, Icon } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../helpers/validateHelper';
import { renderName } from '../../components/inputs/renderUsername';
import { renderPassword } from "../../components/inputs/renderPassword";
import { renderDatePicker } from "../../components/inputs/renderDatePicker";
import { renderTextarea } from "../../components/inputs/renderTextarea";
import { renderPicker } from "../../components/inputs/renderPicker";
import ImageUpload from '../../components/inputs/renderImageUpload'



export class UploadForm extends React.Component{
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
                    component={ImageUpload}
                    label="Upload Job Images"
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
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(UploadForm);
