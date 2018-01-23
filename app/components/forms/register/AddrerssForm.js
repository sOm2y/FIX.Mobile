import React from "react";
import { StyleSheet } from "react-native";
import { Button, Text, Form, Spinner, List, ListItem, Radio, Left, Body, Right } from "native-base";
import { Field, reduxForm, reset } from 'redux-form';
import validate from '../../../helpers/validateHelper';
import { renderAddress } from "../../inputs/renderAddress";
import { getAddresses } from '../../../services/addressService';
import { postAddress } from '../../../services/addressService';
import { toastShow } from '../../../services/toastService';
import AddAddressForm  from "../address/AddAddressForm";


export class AddressForm extends React.Component{
    constructor() {
        super();
        this.state = {
          addressList: [],
          isLoadingAddress: true,
          isSelected: false,
          selectedAddressIndex: 0
        };
      }
    componentDidMount(){
        getAddresses().then(res=>{
            this.setState({addressList:res, isLoadingAddress: false})
            console.log(res);
        });
    }

    onSubmit = (values, dispatch) => {
        console.log(values);
        return postAddress(values)
          .then(res => {
            console.log(res)
            dispatch(reset('AddAddressForm'));
           
            toastShow("Add Address Successfully", "success", 3000);   
          })
          .catch(err => {
            console.log(err);
            toastShow("Add Address Unsuccessfully", "danger", 3000);   
          });
    }

    handleSelectAddress(i, event){
        this.setState({selectedAddressIndex: i});
    }


    static navigationOptions = ({ navigation }) => ({
    });

    
    render(){
        const { handleSubmit, navigation, pristine, submitting, previousPage } = this.props;
        
        return (
            <Form>
                <AddAddressForm onSubmit={(values, dispatch)=>this.onSubmit(values.address, dispatch)} />
                {this.state.isLoadingAddress && <Spinner color='white' />}

                {this.state.addressList && this.state.addressList[0] &&
                <List>
                    {this.state.addressList.map((value, key)=>{
                       return ( <ListItem style={styles.listItem} key={key} button onPress={this.handleSelectAddress.bind(this,key)}> 
                      
                            <Body>
                                <Text>{value.description}</Text>
                            </Body>
                            <Right>
                                <Radio key={key} selected={this.state.selectedAddressIndex===key} />
                            </Right>

                        </ListItem>)
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


const styles = StyleSheet.create({
    listItem:{
      marginLeft: 0, 
      paddingLeft: 17
    }
  });