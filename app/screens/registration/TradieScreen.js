import React from "react";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import WizardTradieForm from '../../components/wizards/WizardCustomerForm';

export default class TradieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      navigation.navigate("Home");
      dispatch(reset('CustomerWizardForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
     <WizardTradieForm wizardLabel='WizardTradieForm' navigation={navigation} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
    );
  }
}