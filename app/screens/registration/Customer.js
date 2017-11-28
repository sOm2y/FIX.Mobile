import React from "react";
import { translate } from 'react-i18next';
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import CustomerWizardForm from '../../components/forms/CustomerWizardForm';



@translate(['home', 'common'], { wait: true })

export default class Customer extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: screenProps.t('home:title')
  });

  onSubmit = (values, dispatch, navigation) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      navigation.navigate("Home");
      dispatch(reset('PersonalDetailForm'));
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      console.log(err);
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { t, i18n, navigation } = this.props;
    const { navigate } = navigation;

    return (
     <CustomerWizardForm onSubmit={(values,dispatch) => this.onSubmit(values, dispatch, navigation)} />
    );
  }
}