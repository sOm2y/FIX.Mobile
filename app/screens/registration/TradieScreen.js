import React from "react";
import { connect } from "react-redux";
import { reset } from 'redux-form';
import { postUserAccount } from '../../services/authService';
import { toastShow } from '../../services/toastService';
import { registerSuccess } from "../../actions/actionCreator";
import WizardTradieForm from '../../components/wizards/WizardCustomerForm';

class TradieScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
  });

  onSubmit = (values, dispatch) => {
    console.log(values);
    return postUserAccount(values)
    .then(res => {
      dispatch(registerSuccess);
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
     <WizardTradieForm wizardLabel='WizardTradieForm' navigation={navigation} onSubmit={(values,dispatch) => this.onSubmit(values, dispatch)} />
    );
  }
}

const mapDispatchToProps = {
  // registerSuccess
};

const TradieRegister = connect(null, mapDispatchToProps)(TradieScreen);

export default TradieRegister;