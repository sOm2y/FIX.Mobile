import React from "react";
import { Button, Text, Form, Spinner, List, ListItem, Radio, Left, Body, Right, toastShow } from "native-base";
import { Field, reduxForm, reset } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderAddress } from "../../inputs/renderAddress";
import { getAddresses } from '../../../services/addressService';
import { postAddress } from '../../../services/addressService';
import AddAddressForm  from "../address/AddAddressForm";


export class AddressForm extends React.Component{
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

    onSubmit = (values, dispatch, navigation) => {
        console.log(values);
        values = Object.assign({grant_type:'password'},values);
        return postAddress(values)
          .then(res => {
            console.log(res)
            dispatch(reset('AddAddressForm'));
           
            toastShow("SignIn Successfully", "success", 3000);   
          })
          .catch(err => {
            console.log(err);
            toastShow("SignIn Unsuccessfully", "danger", 3000);   
          });
    }


    static navigationOptions = ({ navigation }) => ({
    });

    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <AddAddressForm onSubmit={(values, dispatch)=>this.onSubmit(values, dispatch, navigation)} />
                {this.state.isLoadingAddress && <Spinner color='white' />}

                {this.state.addressList && this.state.addressList[0] &&
                <List>
                    {this.state.addressList[0].map((value)=>{
                        <ListItem button onPress={()=>{
                            this.setState({isSelected: true})
                        }}> 
                            <Left></Left>
                            <Body>
                                <Text>{value.description}</Text>
                            </Body>
                            <Right>
                                <Radio selected={this.state.isSelected} />
                            </Right>

                        </ListItem>
                    })}
                    
                </List>
                }
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
//   form: 'WizardForm', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate,
})(AddressForm);
