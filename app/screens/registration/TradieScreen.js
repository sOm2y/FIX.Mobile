import React from "react";
import { connect } from "react-redux";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import { registerSuccess, showBusinessForm } from "../../actions/actionCreator";

import WizardTradieForm from '../../components/wizards/WizardTradieForm';

class TradieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      dispatch(reset('WizardTradieForm'));
      this.props.showBusinessForm();
      this.props.registerSuccess();
      toastShow("SignIn Successfully", "success", 3000); 
    }).catch( err => {
      toastShow("SignIn Unsuccessfully", "danger", 3000);   
    });
}
  render(){
    const { navigation } = this.props;
    const { navigate } = navigation;

    return (
     <WizardTradieForm wizardLabel='WizardTradieForm' navigation={navigation} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch)} />
    );
  }
}

const mapDispatchToProps = {
  registerSuccess,
  showBusinessForm
};

const TradieRegister = connect(null, mapDispatchToProps)(TradieScreen);

export default TradieRegister;