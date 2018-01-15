import React from "react";
import { Button, Text, Form, Item } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from "../../../components/inputs/renderPicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";


export class BusinessDetailForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems } = this.props;
        
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

                <Field name="vehicleType" mode="dropdown" style={{left: 10}} component={renderPicker} >
                    {pickerItems.map((value, key) => {
                        <Item label={value} value={value} />
                    })}
                </Field>
                
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
})(BusinessDetailForm);
