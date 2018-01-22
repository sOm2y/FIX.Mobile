import React from "react";
import { Button, Text, Form, Spinner, List, ListItem, Radio, Left, Body, Right } from "native-base";
import { Field, reduxForm } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderAddress } from '../../inputs/renderAddress';
import { getAddresses }  from '../../../services/addressService';


export class AddAddressForm extends React.Component{
    constructor() {
        super();
        this.state = {
          addressList: [],
          isLoadingAddress: true,
          isSelected: false
        };
      }


    componentDidMount(){
        getAddresses().then(res=>{
            this.setState({addressList:res.data, isLoadingAddress: false})
            console.log(res.data);
        });
    }

    static navigationOptions = ({ navigation }) => ({
    });

    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <Field
                    name="address"
                    type="text"
                    component={renderAddress}
                    label="Your address"
                />

                <Button block primary
                style={{ marginTop: 10 }}
                onPress={handleSubmit} 
                disabled={pristine || submitting}>
                    <Text>Add Address</Text>
                </Button>
                {/* <Button bordered block primary
                style={{ marginTop: 10 }}
                onPress={previousPage} 
                disabled={submitting}>
                    <Text>Previous</Text>
                </Button> */}
            </Form>
        );
    }
}

export default reduxForm({
  form: 'AddAddressForm', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(AddAddressForm);
