import React from "react";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import WizardCustomerForm from '../../components/wizards/WizardCustomerForm';


export default class CustomerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      navigation.navigate("Home");
      dispatch(reset('WizardForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
     <WizardCustomerForm wizardLabel='WizardCustomerForm' navigation={navigation} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
    );
  }
}