import React from "react";
import { Button, Text, Form, Spinner } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderName } from '../../../components/inputs/renderUsername';
import { renderPicker } from "../../../components/inputs/renderPicker";
import { renderTextarea } from "../../../components/inputs/renderTextarea";
import AddAddressForm  from "../address/AddAddressForm";


export class BusinessDetailForm extends React.Component{
    static navigationOptions = ({ navigation }) => ({
    });
    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage, pickerItems } = this.props;
        
        return (
            <Form>
                <Field
                    name="businessName"
                    type="text"
                    component={renderName}
                    label="Business Name"
                />

                <Field
                    name="businessLegalName"
                    type="text"
                    component={renderName}
                    label="Business Legal Name"
                />

                <Field
                    name="taxNumber"
                    type="text"
                    component={renderName}
                    label="Company Tax Number"
                />

                <AddAddressForm onSubmit={(values, dispatch)=>this.onSubmit(values.address, dispatch)} />
                {this.state.isLoadingAddress && <Spinner color='white' />}
                
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
